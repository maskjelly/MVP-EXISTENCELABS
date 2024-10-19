import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/app/openai';

// download file by file ID
export async function GET(
  _request: NextRequest,
  { params }: { params: { fileId: string } }
): Promise<NextResponse> {
  const { fileId } = params;

  try {
    const [file, fileContent] = await Promise.all([
      openai.files.retrieve(fileId),
      openai.files.content(fileId),
    ]);

    return new NextResponse(fileContent.body, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.filename}"`,
        'Content-Type': 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new NextResponse('Failed to retrieve the file', { status: 500 });
  }
}
