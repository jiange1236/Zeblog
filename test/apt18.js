Array.prototype.remove = function(from, to) {
	if (typeof from != "number") return this.remove(this.indexOf(from));
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

var hexArr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
function hex2rgb(color) {
       var return_rgbval = [];
       if (color[0] == "#") color = color.substr(1); // Removes the '#' at the start if it's present
       // Originally color.charAt(0) was written color[0], however this didn't work out in IE
       if (color.length == 3) color = color.charAt(0)+color.charAt(0)+color.charAt(1)+color.charAt(1)+color.charAt(2)+color.charAt(2);
       color = color.toUpperCase(); // To be compared with the hexArr array the color string have to be in uppercase
       for (i=0;i<color.length;i+=2) {
              hex = color.substr(i,2);
			  dec = parseInt(hex,16);
			  return_rgbval[Math.floor(i/2)] = dec;
       }
       return return_rgbval;
}


jQuery(function ($) {
	// redirect the old ones
	if(!Modernizr.canvas) {
		jQuery('#tweet').html('<p>Diese Seite wurde mit Hilfe der neuesten HTML 5-Technik programmiert und lässt sich daher nur auf neueren Browser-Versionen ansehen. Browser, die dieses Feature unterstützen sind z.B. <a href="http://getfirefox.com">FireFox 3.5</a>, <a href="http://apple.com/safari">Safari</a>, <a href="http://www.opera.com/">Opera</a> or <a href="http://google.com/chrome">Chrome</a>. Sie können sich diese Browser kostenlos herunterladen.</p>');
	} else {
		
		jQuery('#about').css('left', window.innerWidth-46);
		jQuery('#about').css('top', window.innerHeight-26);

		var numParticles = 100;
		var i;
		var el = document.getElementById("theapt");	
		var width = window.innerWidth;
		var height = window.innerHeight;
		var p = Processing(el);
		var mx = 0;
		var my = 0;
		var impulsX = 0;
		var impulsY = 0;
		var impulsToX = 0;
		var impulsToY = 0;
		var startedAt;
		var now;
	//	var machine = [6775, 10217, 13583, 16967, 20375, 23777, 27113, 30466, 33842, 37209, 40651, 43992, 47371, 50659, 55091, 57497, 60840, 64245, 67580, 71863, 74326, 77769, 81233, 84448, 87838, 91228, 94558, 98394];
		var machine = [13094, 13653, 15132, 16624, 18137, 19629, 21172, 22629, 24140, 25631, 27140, 28728, 30108, 31633, 33142, 34656, 36134, 37636, 39152, 40668, 42131, 43596, 45170, 46619, 48147, 49642, 51163, 52626, 54220, 55669, 57149, 58617, 60118, 61572, 63064, 64549, 66134, 67616, 70573, 72115, 73594, 75107, 76604, 78117, 79628, 81125, 82628, 84161, 85644, 87213, 88651, 90194, 91673, 93248, 94668, 96147, 97629, 99173, 100637, 102242, 103692, 105236, 106636, 108182, 109587, 111148, 112630, 114060, 115637, 117069, 118042, 120172, 121676, 123254, 124577, 126202, 127817, 129686, 132052, 133604, 135179, 136652, 138187, 139609, 141084, 142571, 144084, 145603, 147180, 148573, 150142, 151820, 153211, 154567, 156097, 157597, 159110, 160595, 162149, 163617, 165123, 166565, 168089, 169603, 171215, 173446, 175598, 177048, 178490, 180269, 181616, 184604, 189284, 192782, 195827, 198787, 201856, 204867, 207819, 211191, 213709, 216808, 219764, 222804, 225795, 228737, 229605, 231068, 232588, 234106, 235611, 237056, 238591, 240083, 241606, 243091, 244580];
		var machineIndex = 0;
		var events = [];
		var play = false;
		var focusedParticleIndex = null;
		var focusedCategoryIndex = null;
		var theWords = null;
		var theCategories = null;
		var allCategories = null;
		var pixels = [];
		var host = 'http://szenesprachenwiki.de';
		components = [];

		var transitions = [
			// random position
			function() {
				for(i = 0; i<pixels.length; i++ ) {
					var p = pixels[i];
					if(p.flightMode != 2) {
						p.toX = Math.random()*width;
						p.toY = Math.random()*height;
						p.speedX = Math.cos(p.angle) * Math.random() * 3;
						p.speedY = Math.sin(p.angle) * Math.random() * 3; 
					}
				}
			},
			// white flash
			function() {
				for(i = 0; i<pixels.length; i++ ) {
					var p = pixels[i];
					if(p.flightMode != 2) {
						p.r = 255;
						p.g = 255;
						p.b = 255;
						p.size = Math.random()*50 + 50;
					}
				}
			},
			// change size
			function() {
				for(i = 0; i<pixels.length; i++ ) {
					var p = pixels[i];
					if(p.flightMode != 2) {
						p.toSize = Math.random()*10+1;
					}
				}
			},
			// circle shape
			function() {
				var r = Math.floor(Math.random()*250 + 100);
				for(i = 0; i<pixels.length; i++ ) {
					var p = pixels[i];
					var color = hex2rgb(theCategories[Math.floor(Math.random()*theCategories.length)]['color']);
					if(p.flightMode != 2) {
						p.toSize = Math.random()*4+1;
						p.toX = width/2 + Math.cos(i*3.6*Math.PI/180) * r;
						p.toY = height/2 + Math.sin(i*3.6*Math.PI/180) * r;
						impulsX = 0;
						impulsY = 0;
						p.speedX = (Math.random() - 0.5)/2;
						p.speedY = (Math.random() - 0.5)/2; 
						p.toR = color[0];
						p.toG = color[1];
						p.toB = color[2];
					}
				}
			},

			// heart
			function() {
				var heart = [[707,359],[707,359],[707,359],[707,359],[708,358],[711,354],[713,352],[714,348],[716,345],[720,335],[721,334],[722,333],[724,332],[725,330],[727,327],[731,322],[734,320],[737,318],[740,314],[743,312],[745,311],[749,309],[753,308],[757,306],[761,303],[764,302],[767,302],[771,301],[774,301],[778,301],[783,301],[786,301],[790,300],[796,300],[801,300],[805,300],[809,300],[811,300],[815,302],[817,303],[820,305],[822,306],[824,307],[827,309],[830,311],[834,313],[836,314],[838,316],[841,318],[844,321],[845,324],[847,326],[849,328],[852,332],[853,334],[855,336],[857,337],[858,339],[860,341],[862,345],[863,349],[863,352],[864,356],[864,359],[865,362],[866,364],[868,368],[869,372],[870,377],[871,381],[872,384],[872,388],[872,392],[872,395],[872,399],[872,401],[872,405],[872,409],[871,412],[870,417],[869,419],[869,422],[867,427],[866,429],[865,434],[863,438],[862,442],[861,443],[860,445],[857,448],[854,451],[852,454],[849,456],[846,459],[843,460],[836,466],[835,466],[833,467],[821,475],[820,477],[819,478],[817,481],[815,483],[811,486],[808,487],[803,491],[802,491],[800,492],[795,493],[791,497],[789,498],[786,498],[780,502],[772,507],[770,510],[767,511],[762,516],[758,520],[756,524],[753,527],[750,529],[746,532],[741,534],[736,537],[732,538],[731,539],[735,537],[735,537],[735,537],[730,543],[729,546],[727,551],[726,553],[723,555],[721,558],[715,568],[714,570],[714,572],[713,575],[708,585],[708,586],[707,586],[704,583],[704,359],[704,359],[700,356],[698,352],[697,350],[696,345],[694,343],[693,340],[690,335],[688,335],[687,334],[683,332],[681,329],[677,326],[675,323],[672,319],[669,314],[668,312],[663,310],[660,310],[656,310],[653,309],[647,309],[644,308],[642,308],[637,307],[632,303],[628,301],[624,297],[621,297],[619,297],[616,297],[616,298],[616,299],[614,300],[620,302],[620,302],[620,302],[618,302],[612,302],[605,302],[598,302],[596,303],[594,305],[592,307],[590,309],[586,310],[583,313],[582,315],[579,319],[576,320],[573,323],[571,325],[569,327],[563,329],[560,333],[558,336],[557,338],[556,341],[555,343],[551,346],[549,349],[549,354],[549,357],[547,361],[546,367],[543,372],[542,375],[541,380],[540,381],[540,382],[540,382],[540,382],[540,382],[540,384],[540,386],[540,389],[539,391],[539,394],[539,398],[539,404],[539,408],[539,412],[539,416],[540,423],[542,428],[544,433],[549,436],[552,439],[555,442],[557,445],[560,448],[562,452],[564,459],[565,461],[560,449],[560,449],[561,450],[571,458],[580,466],[584,469],[587,473],[589,476],[591,477],[575,466],[575,466],[575,466],[576,466],[582,471],[587,475],[590,477],[594,481],[598,484],[601,489],[604,491],[607,495],[611,496],[617,498],[622,500],[626,501],[629,504],[633,508],[636,510],[642,515],[650,522],[651,525],[655,528],[657,529],[660,530],[663,530],[667,533],[671,534],[676,536],[679,537],[681,539],[683,540],[676,536],[676,536],[676,536],[679,539],[684,546],[687,548],[689,551],[692,554],[696,558],[698,563],[701,567],[702,571],[704,574],[705,577],[706,579],[707,580],[708,582],[709,586]];
				impulsX = 0;
				impulsY = 0;
				for(i = 0; i<pixels.length; i++ ) {
					var p = pixels[i];
					if(p.flightMode != 2) {
						p.toX = heart[Math.floor(i*3.6) % heart.length][0]-200;
						p.toY = heart[Math.floor(i*3.6) % heart.length][1]-150;
						p.speedX = (Math.random() - 0.5)/2;
						p.speedY = (Math.random() - 0.5)/2; 
					}
				}
			}
		];


		var Universe = function Pixels() {
			return {
				framecount : 0,
				doUniverse: function() {
					for(i = 0; i<numParticles; i++ ) {
						var randomCategory = theCategories[Math.floor(Math.random()*theCategories.length)];
						var rgb = hex2rgb(randomCategory['color']);
						pixels[i] = {
							x          : Math.random()*width,
							y          : height/2,
							toX        : 0,
							toY        : height/2,
							color      : Math.random()*200 + 55,
							angle      : Math.random()*Math.PI*2,
							size       : 0,
							toSize     : Math.random()*4+1,
							r		   : 0,
							g		   : 0,
							b          : 0,
							toR 	   : rgb[0],
							toG 	   : rgb[1],
							toB 	   : rgb[2],
							flightMode : 0
						};
						pixels[i].toX = pixels[i].x;
						pixels[i].speedX = 0;
						pixels[i].speedY = 0; 
					}
				},
				update: function () {
					impulsX = impulsX + (impulsToX - impulsX) / 30;
					impulsY = impulsY + (impulsToY - impulsY) / 30;

					// move to tox
					for(i = 0; i<pixels.length; i++ ) {
						pixels[i].x = pixels[i].x + (pixels[i].toX - pixels[i].x) / 10;
						pixels[i].y = pixels[i].y + (pixels[i].toY - pixels[i].y) / 10;
						pixels[i].size = pixels[i].size + (pixels[i].toSize - pixels[i].size) / 10;

						pixels[i].r = pixels[i].r + (pixels[i].toR - pixels[i].r) / 10;
						pixels[i].g = pixels[i].g + (pixels[i].toG - pixels[i].g) / 10;
						pixels[i].b = pixels[i].b + (pixels[i].toB - pixels[i].b) / 10;
					}

					// update speed
					for(i = 0; i<pixels.length; i++ ) {
						// check for flightmode
						var a = Math.abs(pixels[i].toX - mx) *  Math.abs(pixels[i].toX - mx);
	                    var b = Math.abs(pixels[i].toY - my) *  Math.abs(pixels[i].toY - my);
	                    var c = Math.sqrt(a+b);

						if(pixels[i].flightMode != 2) {
							if(c < 120) {
								if(pixels[i].flightMode == 0) {
				                    var alpha = Math.atan2(pixels[i].y - my, pixels[i].x - mx) * 180 / Math.PI + Math.random()*180-90;
				                    pixels[i].degree = alpha;
									pixels[i].degreeSpeed = Math.random()*1+0.5;
									pixels[i].frame = 0;
								}
								pixels[i].flightMode = 1;
							} else {
								pixels[i].flightMode = 0;
							}
						}

						// random movement
						if(pixels[i].flightMode == 0) {
							// change position
							pixels[i].toX += pixels[i].speedX;
							pixels[i].toY += pixels[i].speedY;

							// check for bounds
							if(pixels[i].x < 0) {
								pixels[i].x = width;
								pixels[i].toX = width;
							}
							if(pixels[i].x > width) {
								pixels[i].x = 0;
								pixels[i].toX = 0;
							}

							if(pixels[i].y < 0) {
								pixels[i].y = height;
								pixels[i].toY = height;
							}
							if(pixels[i].y > height) {
								pixels[i].y = 0;
								pixels[i].toY = 0;
							}
						}

						// seek mouse
						if(pixels[i].flightMode == 1) {
							pixels[i].toX = mx + Math.cos((pixels[i].degree + pixels[i].frame ) % 360 * Math.PI /180)*c;
							pixels[i].toY = my + Math.sin((pixels[i].degree + pixels[i].frame ) % 360 * Math.PI /180)*c;
							pixels[i].frame += pixels[i].degreeSpeed;
							pixels[i].degreeSpeed += 0.01;
						}

						if(pixels[i].flightMode != 2) {
							// add impuls
							pixels[i].toX += Math.floor(impulsX * pixels[i].size/30);
							pixels[i].toY += Math.floor(impulsY * pixels[i].size/30);
						}
					}

					// set an choord
					var r1 = Math.floor(Math.random() * pixels.length);
					var r2 = Math.floor(Math.random() * pixels.length);

					if(pixels[r1].flightMode != 2) pixels[r1].size = Math.random()*30;
					if(pixels[r2].flightMode != 2) pixels[r2].size = Math.random()*30;

					this.framecount++;

					now = new Date();
					if(now.getTime() - startedAt.getTime() >= machine[machineIndex]) {
						machineIndex++;
						impulsX = Math.random()*800-400;
						impulsY = -Math.random()*400;

						var transIndex = Math.floor(Math.random()*transitions.length);
						transitions[transIndex]();
					}				
				},
				draw: function () {	
					p.noStroke();
					// Draw pixels
					for(i = 0; i<pixels.length; i++ ) {
						p.fill(Math.floor(pixels[i].r), Math.floor(pixels[i].g), Math.floor(pixels[i].b));
						p.ellipse(pixels[i].x, pixels[i].y, pixels[i].size, pixels[i].size);
					}

					if(focusedParticleIndex != null) {
						p.fill(Math.floor(pixels[focusedParticleIndex].r), Math.floor(pixels[focusedParticleIndex].g), Math.floor(pixels[focusedParticleIndex].b));
						p.ellipse(pixels[focusedParticleIndex].x, pixels[focusedParticleIndex].y, pixels[focusedParticleIndex].size, pixels[focusedParticleIndex].size);				
					}
					
					if(window.name != "iframe") {
						// Draw categories
						var color = [];
						var cursor = 'default';
						for(i = 0; i < allCategories.length; i++) {
							color = hex2rgb(allCategories[i]['color']);
							p.fill(color[0],color[1],color[2]);
						
							if((p.mouseX > width-50-7.5 && p.mouseX < width-50+7.5 && p.mouseY > height-75-7.5-20*i && p.mouseY < height-75+7.5-20*i)) {
								if(focusedCategoryIndex != i) {
									$("#category").css({
										display: 'block',
										right: 60+7.5,
										top: height-75-7.5-20*i,
										color: allCategories[i]['color']
									});
									cursor = 'pointer';
									$("#category").text(allCategories[i]['name']);
								}
								p.ellipse(width-50,height-75-20*i,20,20);
							} else {
								p.ellipse(width-50,height-75-20*i,14,14);
							}
						}
					
						// Alle Kategorien
						p.stroke(0);
						p.fill(255,255,255);
						if(p.mouseX > width-50-7.5 && p.mouseX < width-50+7.5 && p.mouseY > height-75-7.5-20*i && p.mouseY < height-75+7.5-20*i) {
							$("#category").css({
								display: 'block',
								right: 60+7.5,
								top: height-75-7.5-20*i,
								color: '#000000'
							});
							cursor = 'pointer';
							$("#category").text('Alle');
							p.ellipse(width-50,height-75-20*i,19,19);
						} else {
							p.ellipse(width-50,height-75-20*i,14,14);
						}

						$("#theapt").css('cursor',cursor);
						if(cursor == 'default') {
							$("#category").css('display','none');
						}
					}
				}
			}
		};
		components.push(new Universe());

		// setup processing object
		p.setup = function() {
			p.size(width, height);
			p.noStroke();
			p.frameRate( 60 );
			p.fill(0, 0, 0);

			startedAt = new Date();
		}

		p.mouseMoved = function(){
	      mx = p.mouseX;
	      my = p.mouseY;
	    }

		p.mousePressed = function() {
			var d = new Date().getTime() - startedAt.getTime();
			
			// Draw categories
			var category_hit = false;
			var category_i = null;
			for(i = 0; i < allCategories.length; i++) {
				var category = allCategories[i];
				if(p.mouseX > width-50-7.5 && p.mouseX < width-50+7.5 && p.mouseY > height-75-7.5-20*i && p.mouseY < height-75+7.5-20*i) {
					var color = hex2rgb(category['color']);
					category_hit = true;
					category_i = i;
					focusedCategoryIndex = i;
				}
			}
			
			if(p.mouseX > width-50-7.5 && p.mouseX < width-50+7.5 && p.mouseY > height-75-7.5-20*i && p.mouseY < height-75+7.5-20*i) {
				// Alle Kategorien wurde gewählt
				var color = null;
				category_hit = true;
				category_i = null;
				$("#static-category").fadeOut();
				focusedCategoryIndex = null;
			}
			
			if(category_hit) {
				for(i = 0; i < pixels.length; i++) {
					var pixel = pixels[i];
					pixel.toY = height/2;
					pixel.toX = width/2;
					pixel.flightMode = 2;
					if(color != null) {
						pixel.toR = color[0];
						pixel.toG = color[1];
						pixel.toB = color[2];
					} else {
						var color = hex2rgb(allCategories[Math.floor(Math.random()*allCategories.length)]['color']);
						pixel.toR = color[0];
						pixel.toG = color[1];
						pixel.toB = color[2];
					}
					if(focusedParticleIndex == i) {
						pixel.toSize = Math.random()*4+1
						$("#tweet").fadeOut();
					}
				}
				$("#category").hide();
				if(focusedCategoryIndex != null) {
					$("#static-category").show();
					$("#static-category").css({
						right: 60+7.5,
						top: height-75-7.5-20*focusedCategoryIndex,
						color: allCategories[focusedCategoryIndex]['color']
					});
					$("#static-category").text(allCategories[focusedCategoryIndex]['name']);
				}
			}
			
			if(category_hit) {
				if(category_i != null) {
					var url = host + '/words.json?c=' + allCategories[category_i]['id'];
				} else {
					var url = host + '/words.json';
				}
				jQuery.ajax({
			        url: url,
					dataType: 'jsonp',
			        success: function (data) {
						theWords = data.words;
						theCategories = data.categories;

						var color = [];
						for(i = 0; i < pixels.length; i++) {
							var pixel = pixels[i];
							color = hex2rgb(data.categories[Math.floor(Math.random()*data.categories.length)]['color'])
							pixel.toX = Math.random()*width;
							pixel.toY = Math.random()*height;
							pixel.angle = Math.random()*Math.PI*2;
							pixel.flightMode = 0;
							pixel.toR = color[0];
							pixel.toG = color[1];
							pixel.toB = color[2];
							pixel.speedX = Math.cos(pixel.angle) * Math.random() * 3;
							pixel.speedY = Math.sin(pixel.angle) * Math.random() * 3;
						}
			        }
			    });
			}
			
			if(category_hit == false) {
				if(focusedParticleIndex != null) {
					pixels[focusedParticleIndex].flightMode = 0;
					pixels[focusedParticleIndex].toSize = Math.random()*10+1;
				} 
				for(var i = 0; i<numParticles; i++ ) {
					if(pixels[i].flightMode == 1) {
						pixels[i].flightMode = 2;

						pixels[i].toSize = 100;
						pixels[i].toX = 200;
						pixels[i].toY = height/2;

						focusedParticleIndex = i;

						var randomWord = theWords[Math.floor(Math.random()*theWords.length)];

						if(window.name != "iframe") {
							$('#tweet').html('<span class="headline"><a href="/definition/' + randomWord['word_slug'] + '">' + randomWord['word'] + ': <em>' + randomWord['description'] + '</em></a></span><br /><span class="user">gepostet in <a href="/words/verzeichnis/?c=' + randomWord['category_id'] + '">' + randomWord['category'] + '</a><br />von <a href="/users/' + randomWord['user_id'] + '">' + randomWord['user']) + '</a></span>';
						} else {							
							$('#tweet').html('<span class="headline"><a target="_blank" href="/definition/' + randomWord['word_slug'] + '">' + randomWord['word'] + ': <em>' + randomWord['description'] + '</em></a></span><br /><span class="user">gepostet in <a target="_blank" href="/words/verzeichnis/?c=' + randomWord['category_id'] + '">' + randomWord['category'] + '</a><br />von <a target="_blank" href="/users/' + randomWord['user_id'] + '">' + randomWord['user']) + '</a></span>';
						}
						$('#tweet').fadeIn();
					
						var rgb = hex2rgb(randomWord['color']);
						$("#tweet h1, #tweet, #tweet a").css("color", 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
						pixels[i].r = rgb[0];
						pixels[i].g = rgb[1];
						pixels[i].b = rgb[2];
						pixels[i].toR = rgb[0];
						pixels[i].toG = rgb[1];
						pixels[i].toB = rgb[2];

						// abort for loop
						i = numParticles;
					}
				}
			}
		}
		p.draw=function(){
			if(play) {
				for (var i=0; i<components.length; i++) {
					components[i].update();
				}
				p.background( 255 );
				for (var i=0; i<components.length; i++) {
					components[i].draw();
				}
			}
		}

		// browser detection
		var canPlayType = $('#audio')[0].canPlayType("audio/ogg");
		if(canPlayType.match(/maybe|probably/i)) {
			$('#audio').attr('src', host + '/javascripts/canvas/thankyou.ogg');
		} else {
			$('#audio').attr('src', host + '/javascripts/canvas/thankyou.mp3');
		}
		
		$('#tweet').css('top', Math.floor(height/2-52) + 'px');
		p.init();

		$('#tweet').attr('unselectable', 'on');
		$('#tweet').css('MozUserSelect', 'none');
		$('#tweet').css('KhtmlUserSelect', 'none');
		
		if((typeof HTMLAudioElement == 'object' || typeof HTMLAudioElement == 'function') && window.name != "iframe") {
			// start if enought data is loaded
			$('#audio').bind('canplay', function() {
				if(!play) {
					jQuery.ajax({
				        url: host + '/words.json',
						dataType: 'jsonp',
				        success: function (data) {
							theWords = data.words;
							theCategories = data.categories;
							allCategories = theCategories;

							setTimeout(function() {
								var soundOn = true;
								startedAt = new Date();
								
								$('#audio').get(0).play();
								$('#sound-on-off').click(function() {
									if(soundOn) {
										$('#sound-on-off').text('Sound an');
										$('#audio').get(0).pause();
										soundOn = false;
									} else {
										$('#sound-on-off').text('Sound aus');
										$('#audio').get(0).play();
										soundOn = true;
									}
								});
								
								
								$('#tweet').hide();
								play = true;
								if(pixels.length == 0) components[0].doUniverse();
							}, 100);
					
				        }
				    });	
				}
			});
		} else {
			// start without audio
			if(!play) {
				jQuery.ajax({
			        url: host + '/words.json',
					dataType: 'jsonp',
			        success: function (data) {
						theWords = data.words;
						theCategories = data.categories;
						allCategories = theCategories;

						setTimeout(function() {
							startedAt = new Date();
							$('#audio').hide();
							$('#tweet').hide();
							play = true;
							if(pixels.length == 0) components[0].doUniverse();
						}, 100);
						
						setTimeout(function() {
							p.mousePressed();
						}, 3000);						
			        }
			    });
			}
		}
	}
});
