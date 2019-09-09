import { HighlighterPipe } from './highlighter.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

describe('Pipe: Highlighter', () => {
    let pipe: HighlighterPipe;
    let domSanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed
          .configureTestingModule({
            imports: [
              BrowserModule
            ]
        });
        domSanitizer = TestBed.get(DomSanitizer);
        pipe = new HighlighterPipe(domSanitizer);
    });


    it('providing no value returns empty string', () => {
        expect(pipe.transform('', '')).toBe('');
    });

    it('providing name value but no searched text returns name', () => {
        expect(pipe.transform('angular', '')).toBe('angular');
    });

    it('providing no name value but providing searched text returns empty string', () => {
        expect(pipe.transform('', 'ang')).toBe('');
    });

    it('providing both name and searched text, should highlight the searched keywords', () => {
        // Setup
        const search = 'ang';
        const name = 'angular';
        const safeHtml = `<span style='background-color:yellow'>ang</span>ular`;
        // Test
        const result = pipe.transform(name, search);
        // Assert
        const expected = domSanitizer.bypassSecurityTrustHtml(safeHtml);
        expect(result).toEqual(expected);
    });
});
