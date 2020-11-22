const covidService = require('../services/covid19Service');

const getStatsForLocation = async (req, res) => {
    try {
        const location = req?.query?.location ?? 'canada';
        await covidService.getCovidStatsByCountry(req, res, location)
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }
}

module.exports = {
    getStatsForLocation
}
