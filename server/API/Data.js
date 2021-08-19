const axios = require("axios");
const cheerio = require("cheerio");

async function getMellonHtml() {
    try {
      return await axios.get("https://www.melon.com/chart/index.htm");
    } catch (error) {
      console.error(error);
    }
}

async function getMellonChart() {
    let melonChartList = [];
    let html = await getMellonHtml();
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

module.exports = { getMellonChart };