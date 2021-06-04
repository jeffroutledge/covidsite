class CanadaNationalStats {
    CasesNew: number = 0;
    CasesTotal: number = 0;
    Recovered: number = 0;
    DailyRecovered: number = 0;
    TotalDeaths: number = 0;
    DailyDeaths: number = 0;
    TotalTested: number = 0;
    DailyTested: number = 0;
    TotalActive: number = 0;
    DailyActive: number = 0;
    TotalHospitalized: number = 0;
    DailyHospitalized: number = 0;
    TotalICU: number = 0;
    DailyICU: number = 0;
    TotalVaccinated: number = 0;
    DailyVaccinated: number = 0;
    constructor (casesNew: number, casesTotal: number, recovered: number, dailyRecovered: number, totalDeaths: number, dailyDeaths: number, totalTested: number, dailyTested: number, totalActive: number, dailyActive: number, totalHospitalized: number, dailyHospitalized: number, totalICU: number, dailyICU: number, totalVaccinated: number, dailyVaccinated: number) {
        this.CasesNew = casesNew;
        this.CasesTotal = casesTotal;
        this.Recovered = recovered;
        this.DailyRecovered = dailyRecovered;
        this.TotalDeaths = totalDeaths;
        this.DailyDeaths = dailyDeaths;
        this.TotalTested = totalTested;
        this.DailyTested = dailyTested;
        this.TotalActive = totalActive;
        this.TotalHospitalized = totalHospitalized;
        this.DailyHospitalized = dailyHospitalized;
        this.TotalICU = totalICU;
        this.DailyICU = dailyICU;
        this.TotalVaccinated = totalVaccinated;
        this.DailyVaccinated = dailyVaccinated;
    }
}
export default CanadaNationalStats;