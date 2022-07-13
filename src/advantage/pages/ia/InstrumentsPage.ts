export default class InstrumentsPage{
    static readonly INSTRUMENTS_TAB = "span[title='Instruments']";
    static readonly PAGE_TITLE = "";
    static readonly SEARCH_FIELD = "#instruments > :nth-child(1) > .k2-entity-search > .row > .col-2 > .k-textbox";
    static readonly NAME_COLUMN = "div[id = 'instruments']>div>div>div>div>div>div>div>div>table>thead>tr>th >> nth=1";
    static readonly INSTRUMENTS_ARRAY = "div[id = 'instruments']>div>div>div>div>div>div>div>div>table>tbody>tr>td:nth-child(2)";
}