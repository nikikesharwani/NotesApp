import { FilterdataPipe } from './filterdata.pipe';

describe('Pipe: Filterdata', () => {
    let pipe: FilterdataPipe;

    beforeEach(() => {
        pipe = new FilterdataPipe();
    });

    it('providing no value returns empty array', () => {
        expect(pipe.transform([], '')).toEqual([]);
    });

    it('providing a value and no search key returns value', () => {
        const notes = [
          {id: 'note1', title: 'test', desc: 'test'},
          {id: 'note2', title: 'demo', desc: 'demo'}
        ];
        expect(pipe.transform(notes, '')).toEqual(notes);
    });

    it('providing no value but providing search key returns empty array', () => {
        expect(pipe.transform([], 'dem')).toEqual([]);
    });

    it('providing both value and search key returns filtered data', () => {
        const notes = [
          {id: 'note1', title: 'test', desc: 'test'},
          {id: 'note2', title: 'demo', desc: 'demo'}
        ];
        expect(pipe.transform(notes, 'dem')).toEqual([{id: 'note2', title: 'demo', desc: 'demo'}]);
    });
});

