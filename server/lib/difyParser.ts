class DifyParser {
  private decoder: TextDecoder;
  private buffer: string;

  constructor() {
    this.decoder = new TextDecoder('utf-8');
    this.buffer = '';
  }

  resetBuffer() {
    this.buffer = '';
  }

  addStreamEventChunk(chunk: Uint8Array) {
    this.buffer += this.decoder.decode(chunk, { stream: true });
  }

  hasValidBuffer() {
    return this.buffer.endsWith('\n\n');
  }

  getMessages() {
    try {
    const lines = this.buffer.split('\n');
    const dataRows = lines
      .filter((line) => line.startsWith('data: '))
      .map((line) => line.slice(6))
      .map((line) => JSON.parse(line));
    const messages = dataRows.filter((dataRow) => dataRow.event === 'message');

    return messages;
    } catch (error) {
      console.error('Error parsing messages:', this.buffer);
      return [];
    }
  }
}

export default DifyParser;
