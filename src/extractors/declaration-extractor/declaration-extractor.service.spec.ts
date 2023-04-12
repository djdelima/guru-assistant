import { DeclarationExtractorService } from './declaration-extractor.service';

describe('DeclarationExtractorService', () => {
  let service: DeclarationExtractorService;

  beforeEach(() => {
    service = new DeclarationExtractorService();
  });

  it('should extract function declarations', () => {
    const content = `function foo() {
                       console.log('foo');
                     }
                     async function bar(ba: string) {
                       console.log('bar');
                     }`;
    const result = service.extractDeclarations(content);
    expect(result).toEqual([
      'function foo()',
      'async function bar(ba: string)',
    ]);
  });

  it('should extract class declarations', () => {
    const content = `class Foo {
                       constructor() {
                         console.log('Foo');
                       }
                     }
                     class Bar {
                       constructor() {
                         console.log('Bar');
                       }
                     }`;
    const result = service.extractDeclarations(content);
    expect(result).toEqual(['class Foo', 'class Bar']);
  });

  it('should extract interface declarations', () => {
    const content = `interface Foo {
                       method(): void;
                     }
                     interface Bar {
                       method(): void;
                     }`;
    const result = service.extractDeclarations(content);
    expect(result).toEqual(['interface Foo', 'interface Bar']);
  });

  it('should extract variable declarations', () => {
    const content = `const foo = 'foo';
                     let bar = 'bar';
                     var baz = 'baz';`;
    const result = service.extractDeclarations(content);
    expect(result).toEqual(['const foo', 'let bar', 'var baz']);
  });
});
