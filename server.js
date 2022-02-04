const http = require('http');
const Jimp = require('jimp')

let image;
Jimp.read('./smil.jpg')
.then(img => {
	image = img;
	console.log("Image loaded!");
})
.catch(err => {
	console.warn("\n!!! IMAGE COULDN'T BE READ !!!\n");
	console.error(err);
});

let font;
Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
.then(fnt => {
	font = fnt;
	console.log("Font loaded!");
})
.catch(err => {
	console.warn("\n!!! FONT COULDN'T BE READ !!!\n");
	console.error(err);
});

const requestListener = async (req, res) => {
	// console.log("req from " + req.headers['x-forwarded-for']);
	const img = image.clone();

	img.print(font, 4, 132,  req.headers['x-forwarded-for']);

	res.setHeader("Content-Type", "image/jpg"); 
	res.writeHead(200);
	res.end(await img.getBufferAsync(Jimp.MIME_JPEG));
}

const server = http.createServer(requestListener);

server.listen(8080);
