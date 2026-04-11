import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    const prompt = `sleek cyberpunk digital atelier technology banner representing ${title}`;
    
    // Switch to free, keyless AI generation to bypass Gemini quota limits
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=675&nologo=true`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Image API failed');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ url: dataUri });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
