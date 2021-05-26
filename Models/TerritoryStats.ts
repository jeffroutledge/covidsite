class TerritoryStats {
    ObjectID: number = 0;
    Name: string = '';
    Recovered: number = 0;
    Tests: number = 0;
    LastUpdated: number = 0;
    SourceURL: string = '';
    ActiveCases: number = 0;
    Hospitalized: number = 0;
    ICU: number = 0;
    ICUVentilator: number = 0;
    Deaths: number = 0;
    CaseTotal: number = 0;
    Vaccinated: number = 0;
    constructor (objectId: number, name: string, recovered: number, tests: number, lastUpdated: number, sourceURL: string, activeCases: number, hospitalized: number, iCU: number, iCUVentilator: number, deaths: number, caseTotal: number, vaccinated: number) {
        this.ObjectID = objectId;
        this.Name = name;
        this.Recovered = recovered;
        this.Tests = tests;
        this.LastUpdated = lastUpdated;
        this.SourceURL = sourceURL;
        this.ActiveCases = activeCases;
        this.Hospitalized = hospitalized;
        this.ICU = iCU;
        this.ICUVentilator = iCUVentilator;
        this.Deaths = deaths;
        this.CaseTotal = caseTotal;
        this.Vaccinated = vaccinated;
    }
}
export default TerritoryStats;