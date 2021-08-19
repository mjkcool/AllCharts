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
    const $ChartList = $("#tb_list form div.service_list_song table tbody tr");
    $ChartList.each(function(i, element) {
        melonChartList.push({
            rank: $(this).find('span.rank').text(),
            title: $(this).find('div.rank01 span a').text(),
            singer: $(this).find('div.rank02 span a').text(),
            album: $(this).find('div.rank03 a').text(),
            status: $(this).find('span.rank_wrap').attr("title"),
        });
    });
    return melonChartList;
}

async function getGenieChart() {
    let genieChartList = [];
    let html = await getGenie50Html();
    let $ = cheerio.load(html.data);
    let $ChartList = $("div.music-list-wrap table tbody tr");
    $ChartList.each(function(i, element) {
        genieChartList.push({
            rank: $(this).find('td.number').text().split('\n')[0],
            title: $(this).find('td.info a.title').text().split('\n').slice(-1)[0].trim(),
            singer: $(this).find('td.info a.artist').text(),
            album: $(this).find('td.info a.albumtitle').text(),
            status: $(this).find('td.number span.rank').eq(1).text(),
        });
    });

    html = await getGenie100Html();
    $ = cheerio.load(html.data);
    $ChartList = $("div.music-list-wrap table tbody tr");
    $ChartList.each(function(i, element) {
        genieChartList.push({
            rank: $(this).find('td.number').text().split('\n')[0],
            title: $(this).find('td.info a.title').text().split('\n').slice(-1)[0].trim(),
            singer: $(this).find('td.info a.artist').text(),
            album: $(this).find('td.info a.albumtitle').text(),
            status: $(this).find('td.number span.rank').eq(1).text(),
        });
    });
    
    return genieChartList;
}

module.exports = { getMelonChart, getGenieChart };