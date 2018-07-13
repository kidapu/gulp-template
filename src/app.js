

// lib (npm)
const log = require('debug')('app')
const dat = require('dat.gui');

// lib (mine)
const Config = require('./lib/Config')


class DatGuiParam
{
	constructor()
	{
		this.color = "#97d479"
	}
}

class App
{
	constructor()
	{
		// vars
		this.canvas
		this.gui
		
		// init
		this.init()
	}

	//------------//
	// Setup
	//------------//
	init()
	{
		let self = this
	
		// dat gui
		let datGuiParam = new DatGuiParam()
		this.setupDatgui(datGuiParam)
		this.gui = datGuiParam

		// Event handler
		downloadButton.addEventListener('click', (e) => { self.onDownload(e, self) })

		// Loop
		requestAnimationFrame(() => { this.loop(self) })
	}


	setupDatgui(datGuiParam)
	{
		let gui = new dat.GUI()
		gui.addColor(datGuiParam, 'color')
		gui.remember(datGuiParam);
	}


	loop(self)
	{
		requestAnimationFrame(() => { this.loop(self) })
		this.canvas.setParams(this.gui)
		this.canvas.draw()
	}


	onKeyDown(e, self)
	{
		switch(e.key)
		{
			case " ":
				log("space!")
				break;
		}
	}
}

new App()

