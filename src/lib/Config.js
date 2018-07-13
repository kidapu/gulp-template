// TODO : 外部の json などから値を読み込む

class Config 
{
	constructor()
	{
		this.JpegFolder = "/JPEGImages"
		this.LabelFolder = "/labels"

		// min size
		this.LabelMinSize = 10
		this.LabelMinSizeRate = 0.015

		this.Categories = [
			// 0
		  {
				"name" : 'カクレクマノミ',
				"color" : '#f17d00',
				"keyboard" : 1
		  },
		  // 1
		  {
				"name" : 'タテジマキンチャクダイ',
				"color" : '#00cbff',
				"keyboard" : 2
		  },
		  // 2
		  {
				"name" : 'キイロハギ',
				"color" : '#f2ff00',
				"keyboard" : 3
		  },
		  // 3  
		  {
				"name" : 'モンガラカワハギ',
				"color" : '#04ff00',
				"keyboard" : 4
		  },
		]
	}
}

module.exports = new Config()