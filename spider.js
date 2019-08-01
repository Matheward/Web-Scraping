var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs');

request('https://wallpaperhub.app/wallpapers', function(err, res, body){
    if (err) console.log('Erro: ' + err)
    
    var $ = cheerio.load(body)
    var i = 0;
    $('.grid-container a').each(function(){
        var title = $(this).find('.grid-container a').text().trim();
        var rating = $(this).find('.grid-itemContent h3').text().trim();
        var img = $(this).find('img').attr('src');
       
        fs.appendFile('imdb.txt', title + ' ' + rating + '\n', function (err) {
            if (err) throw err;
            console.log('Sucesso!'); 

        var file = fs.createWriteStream('img/' + i + '.jpg');
        request(img).pipe(file);
        i = i+1;
          });
    });
});