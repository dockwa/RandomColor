// Free to use & distribute under the MIT license
// Wes Johnson (@SterlingWes)
// Rebuilt by Stuart Yamartino @ Dockwa
//
// inspired by http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.RandomColor = factory();
  }
}(this, function () {

	var RandomColor = {
		goldenRatio: 0.618033988749895,
		hexwidth: 2,
		saturation: 0.5,
		value: 0.95,

		hsvToRgb: function (h,s,v) {
			var	h_i	= Math.floor(h*6),
				f 	= h*6 - h_i,
				p	= v * (1-s),
				q	= v * (1-f*s),
				t	= v * (1-(1-f)*s),
				r	= 255,
				g	= 255,
				b	= 255;
			switch(h_i) {
				case 0:	r = v, g = t, b = p;	break;
				case 1:	r = q, g = v, b = p;	break;
				case 2:	r = p, g = v, b = t;	break;
				case 3:	r = p, g = q, b = v;	break;
				case 4: r = t, g = p, b = v;	break;
				case 5: r = v, g = p, b = q;	break;
			}
			return [Math.floor(r*256),Math.floor(g*256),Math.floor(b*256)];
		},

		padHex: function(str) {
			if(str.length > this.hexwidth) return str;
			return new Array(this.hexwidth - str.length + 1).join('0') + str;
		},

		getOption: function(option, options){
			if(options === undefined){
				options = {};
			}
	    return this.hasOption(option, options) ? options[option] : this[option];
		},

		hasOption: function(option, options){
			if(options === undefined){
				options = {};
			}
			return options.hasOwnProperty(option);
		},

		decimalFromString: function(string){
		  var hash = 5381,
		      i    = string.length

		  while(i)
		    hash = (hash * 33) ^ string.charCodeAt(--i)
	    return (parseInt(hash >>> 0) % 100)/100;
		},

		// @options
		//    fromString: string to base color on
		//    saturation: value between 0 and 1
		//    value: value between 0 and 1
		getRGB: function(options) {
			var hue;
			if(this.hasOption('fromString', options)){
				hue = this.decimalFromString(options['fromString']);
			} else {
				hue = Math.random();
			}
			hue += this.goldenRatio;
			hue %= 1;
			saturation = this.getOption('saturation', options);
			value = this.getOption('value', options);
			return this.hsvToRgb(hue,saturation,value);
		},

		getHex: function(options){
			rgb = this.getRGB(options);
			return "#" + this.padHex(rgb[0].toString(16))
								 + this.padHex(rgb[1].toString(16))
								 + this.padHex(rgb[2].toString(16));
		}
	}

	return RandomColor;
}));
