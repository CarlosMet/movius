import { NextResponse } from "next/server";
import db from "../../../../lib/db";

// ── GET — listar todos los productos ─────────────────────────────────────────
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        p.*,
        GROUP_CONCAT(
          DISTINCT CONCAT(pi.position, '||', pi.url)
          ORDER BY pi.position
          SEPARATOR '::'
        ) AS images_raw,
        GROUP_CONCAT(
          DISTINCT CONCAT(pv.size, '||', pv.stock)
          ORDER BY pv.size
          SEPARATOR '::'
        ) AS variants_raw
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      LEFT JOIN product_variants pv ON pv.product_id = p.id
      GROUP BY p.id
      ORDER BY p.id DESC
    `);

    const products = (rows as any[]).map((p) => ({
      ...p,
      images: p.images_raw
        ? p.images_raw.split("::").map((img: string) => img.split("||")[1])
        : [],
      variants: p.variants_raw
        ? p.variants_raw.split("::").map((v: string) => {
            const [size, stock] = v.split("||");
            return { size, stock: Number(stock) };
          })
        : [],
      images_raw:   undefined,
      variants_raw: undefined,
    }));

    return NextResponse.json(products);

  } catch (error) {
    console.error("GET /admin/products error:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}

// ── POST — crear producto ─────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      filtro,
      name,
      slug,
      price,
      original_price,
      discount_price,
      units_sold = 0,
      type,
      gender,
      category,
      description,
      images   = [],
      variants = [],
    } = body;

    // Validar campos requeridos
    if (!name || !slug || !price || !type || !gender || !category) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: name, slug, price, type, gender, category" },
        { status: 400 }
      );
    }

    const conn = await (db as any).getConnection();

    try {
      await conn.beginTransaction();

      // 1. Insertar producto
      const [result]: any = await conn.query(
        `INSERT INTO products
          (filtro, name, slug, price, original_price, discount_price, units_sold, type, gender, category, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [filtro, name, slug, price, original_price, discount_price, units_sold, type, gender, category, description]
      );

      const productId = result.insertId;

      // 2. Insertar imágenes
      if (images.length > 0) {
        const imageValues = images.map((url: string, i: number) => [productId, url, i]);
        await conn.query(
          `INSERT INTO product_images (product_id, url, position) VALUES ?`,
          [imageValues]
        );
      }

      // 3. Insertar variantes
      if (variants.length > 0) {
        const variantValues = variants.map((v: { size: string; stock: number }) => [
          productId,
          v.size,
          v.stock,
        ]);
        await conn.query(
          `INSERT INTO product_variants (product_id, size, stock) VALUES ?`,
          [variantValues]
        );
      }

      await conn.commit();

      return NextResponse.json(
        { message: "Producto creado correctamente", id: productId },
        { status: 201 }
      );

    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

  } catch (error: any) {
    console.error("POST /admin/products error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}
