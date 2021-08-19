const axios = require("axios");
const cheerio = require("cheerio");

async function getMelonHtml() {
    try {
      return await axios.get("https://www.melon.com/chart/index.htm");
    } catch (error) {
      console.error(error);
    }
}

async function getGenie50Html(){
    try {
        return await axios.get("https://www.genie.co.kr/chart/top200?ditc=D&hh=15&rtm=Y&pg=1");
    } catch (error) {
        console.error(error);
    }
}
async function getGenie100Html(){
    try {
        return await axios.get("https://www.genie.co.kr/chart/top200?ditc=D&hh=15&rtm=Y&pg=2");
    } catch (error) {
        console.error(error);
    }
}

async function getMelonChart() {
    let melonChartList = [];
    let html = await getMelonHtml();
    const $ = cheerio.load(html.data);
    const $ChartList = $("#tb_list form div.service_list_song table tbody tr")
    $ChartList.each(function(i, element) {
        melonChartList[i] = {
            rank: $(this).find('span.rank').text(),
            title: $(this).find('div.rank01 span a').text(),
            singer: $(this).find('div.rank02 span a').text(),
            album: $(this).find('div.rank03 a').text(),
            status: $(this).find('span.rank_wrap').attr("title"),
        };
    });
    return melonChartList;
}

module.exports = { getMelonChart };