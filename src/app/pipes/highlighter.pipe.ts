import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  // pipe to highlight the matched substring in repos name
  transform(name: string, searchText: string): SafeHtml | string {

    if (!name) { return ''; }
    if (!searchText) { return name; }

    const search = searchText.toLowerCase();
    if (name.toLowerCase().includes(search)) {
      const searchedIndex = name.toLowerCase().indexOf(search);
      searchText = name.substring(searchedIndex, searchedIndex + searchText.length);
    }
    const value = name.replace(
      searchText, `<span style='background-color:yellow'>${searchText}</span>` );

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
