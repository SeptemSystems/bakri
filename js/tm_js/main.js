;(function($){
	var user_agent = detect.parse(navigator.userAgent),
		user_browser = user_agent.browser.family.toLowerCase(),
		$loader = $('.loader'),
		$loader_progress = $loader.find('.st1'),
		loader_count = 0,
		loader_timer;
	
	/*var pathStart = "M 28 2 L 17 16 L 23 16 L 9 34 L 17 34 L 3 52 L 19 52 L 19 57 ";
	var ptsDynamic = [
		[[19, 37], 57],
		[[19, 37], 52],
		[[3, 53], 52],
		[[17, 39], 34],
		[[9, 47], 34],
		[[23, 33], 16],
		[[17, 39], 16]
	];
	
	var colors = ["#000", "#0091ea"];
	var tweenPos = {
		path1: 0,
		path2: 0,
		currCol: 0,
		dur: 0.75
	};
	
	var svgTreeContainer = document.getElementById('treeIcon'),
		path1 = document.getElementById('tree1'),
		path2 = document.getElementById('tree2');
	
	function bringIn(){
		path1.setAttribute('fill', colors[0]);
		TweenLite.to(tweenPos, tweenPos.dur, {
			path1: 1,
			ease: Power2.easeOut,
			onComplete: nextColor,
			onUpdate: function(){
				updateTree(path1, tweenPos.path1);
			},
			delay: 0.5
		});
	}
	
	function nextColor(){
		tweenPos.currCol++;
		path1.setAttribute('fill', colors[(tweenPos.currCol + 1) % 2]);
		path2.setAttribute('fill', colors[(tweenPos.currCol) % 2]);
		tweenPos.path2 = 0;
		updateTree(path2, 0);
		TweenLite.to(tweenPos, tweenPos.dur, {
			path2: 1,
			ease: Linear.easeInOut,
			onComplete:nextColor,
			onUpdate: function(){
				updateTree(path2, tweenPos.path2);
			}
		});
	}
	
	function updateTree(pathObj, perc){
		var path = pathStart;
		for(var i = 0; i < ptsDynamic.length; i++){
			path += "L " + (ptsDynamic[i][0][0] + (ptsDynamic[i][0][1] - ptsDynamic[i][0][0]) * perc) + " " + ptsDynamic[i][1];
		}
		path += " z";
		pathObj.setAttribute('d', path);
	}
	
	//buildTree();
	//updateTree(path1, 1);
	bringIn();*/
	
	if($loader_progress.length > 0)
		loader_timer = setInterval(update_loader_count, 10);
	
	var $body = $('body'),
		$to_top = $('.to-top');
	
	$body.addClass(user_browser);
	
	function update_loader_count(){
		loader_count += 0.2;
		
		$loader_progress.css('transform', 'translateX(' + loader_count + '%)');
		
		if(loader_count >= 100){
			clearTimeout(loader_timer);
			
			$loader.fadeOut(500, function(){
				$loader.remove();
				
				page_loaded();
			});
		}
	}
	
	$(window).on('load', function(){
		if(user_browser === 'mobile safari' && $body.hasClass('page-template-chapter3')){
			$('#c3-section10 .c3-section10-content p').height(function(){
				return $(this).parent().height() / 2;
			});
		}
		
		var orientation = 'portrait-primary';
		
		if(typeof screen.orientation !== 'undefined'){
			orientation = screen.orientation.type || screen.mozOrientation.type || screen.msOrientation.type;
		}
		
		if((window.innerWidth > 991 && orientation === 'portrait-primary') || (window.innerWidth > 1100 && orientation === 'landscape-primary'))
			parallax();
		
		if($loader_progress.length > 0)
			setTimeout(function(){
				clearTimeout(loader_timer);
				loader_timer = setInterval(update_loader_count, 1);
			}, 3000);
		else
			setTimeout(function(){
				$loader.fadeOut(400, function(){
					$loader.remove();
					
					page_loaded();
				});
			}, 1000);
		
		function parallax(){
			$('.parallax').each(function(){
				var $this = $(this),
					$parent = $this.parents('.parallax-container'),
					$target = ($parent.length === 0 ? $(window) : $parent),
					depth = parseFloat($this.data('depth')),
					axis = $this.data('axis'),
					trans_dur = parseInt($this.css('transition-duration')) * 1000,
					pause = false;
				
				depth = (typeof depth !== 'undefined' && depth > 0 && depth <= 1 ? depth : 0.5);
				
				if(!$this.hasClass('no-parallax-move') && user_browser !== 'firefox'){
					var circle = get_circle(window.innerWidth / 2 * depth / 10, 33, 0, 0),
						iter = 0,
						speed = Math.floor((Math.random() * (trans_dur * 0.6)) + (trans_dur * 0.5));
					
					setInterval(function(){
						if(!pause){
							$this.css('transform', 'translate(' + circle[iter].x + 'px, ' + circle[iter].y + 'px)');
							
							iter++;
							
							if(iter === circle.length)
								iter = 0;
						}
					}, speed);
				}
				
				if($this.hasClass('mouse-move')){
					$parent.hover(function(){
						$parent.addClass('hover');
						pause = true;
					}, function(){
						$parent.removeClass('hover');
						pause = false;
					});
					
					$target.on('mousemove', function(e){
						var mouseX = e.pageX,
							mouseY = e.pageY,
							percentX = 0,
							percentY = 0;
						
						if(typeof depth === 'undefined'){
							percentX = (mouseX - window.innerWidth / 2) * depth / 10;
							percentY = (mouseY - window.innerHeight / 2) * depth / 10;
						} else {
							switch(axis){
								case 'x':
									percentX = (mouseX - window.innerWidth / 2) * depth / 10;
									break;
								case 'y':
									percentY = (mouseY - window.innerHeight / 2) * depth / 10;
									break;
								default:
									percentX = (mouseX - window.innerWidth / 2) * depth / 10;
									percentY = (mouseY - window.innerHeight / 2) * depth / 10;
							}
						}
						
						$this.css({
							'transform': 'translate(' + percentX + 'px, ' + percentY + 'px)'
						});
					});
				}
			});
		}
		
		function get_circle(radius, steps, centerX, centerY){
			var circle = [];
			
			for(var i = 0; i < steps; i++)
				circle[i] = {
					x: (centerX + radius * Math.cos(2 * Math.PI * i / steps)),
					y: (centerY + radius * Math.sin(2 * Math.PI * i / steps))
				};
			
			return circle;
		}
		
		var $man = $('.man'),
			$man_shadow = $('.man-shadow');
		
		if($man.length !== 0)
			$(window).on('mousemove', function(e){
				var mouseX = e.pageX;
				
				mouseX = (mouseX - $man.offset().left - $man.width() / 2) / (window.innerWidth / 100);
				
				var deg = mouseX * (mouseX < 0 ? 0.9 : 5);
				
				$man_shadow.css('transform', 'skewX(' + deg + 'deg)');
			});
		
		var $time_line_svg = $('#time-line svg');
		if($time_line_svg.length !== 0){
			var $time_line_svg_top = $time_line_svg.offset().top,
				$time_line_svg_items = $time_line_svg.find('path'),
				$time_line_pos = [],
				$time_line_info_item = $('.time-line-info-item'),
				$time_line_info_item_pos = [];
			
			
			$time_line_svg_items.each(function(index){
				var $this = $(this);
				$time_line_pos[index] = {
					top: $this.offset().top,
					element: $this
				};
			});
			
			$time_line_info_item.each(function(index){
				var $this = $(this);
				$time_line_info_item_pos[index] = {
					top: $this.offset().top,
					element: $this
				};
			});
			
			$(window).on('scroll',function(){
				var scroll_top = $(window).scrollTop() + window.innerHeight;
				
				if($time_line_svg_top < scroll_top){
					$time_line_pos.forEach(function(item){
						if(item.top < scroll_top)
							item.element.addClass('show');
						else
							item.element.removeClass('show');
					});
					
					scroll_top -= 100;
					
					$time_line_info_item_pos.forEach(function(item){
						if(item.top < scroll_top)
							item.element.addClass('show');
						else
							item.element.removeClass('show');
					});
				}
			});
		}
		
		$(window).on('scroll',function(){
			var scroll_top = $(window).scrollTop();
			
			if(scroll_top > window.innerHeight / 2)
				$to_top.addClass('show');
			else
				$to_top.removeClass('show');
		});
		
		if($body.hasClass('home'))
			$(window).on('scroll',function(){
				$body.css('background-position', 'center ' + -($(window).scrollTop() * 0.3) + 'px');
			});
		
		$to_top.on('click',function(){
			$('html, body').animate({
				scrollTop: 0
			},1500);
		});
		
		$('.header-nav-toggle').on('click', function(){
			$body.toggleClass('menu-open');
			
			setTimeout(function(){
				$body.toggleClass('overflow');
			}, 900);
		});
		
		var $articles_grid = $('.articles-grid').isotope({
			filter: '*',
			itemSelector: '.grid-item',
			layoutMode: 'fitRows'
		});
		
		$('.articles-filter a').on('click', function(e){
			e.preventDefault();
			
			var $this = $(this);
			
			$('.articles-filter a.active').removeClass('active');
			
			$this.addClass('active');
			
			$articles_grid.isotope({
				filter: $this.attr('href')
			});
		});
		
		var $svg_fade_in = $('.svg-fade-in');
		
		if($svg_fade_in.length !== 0){
			var $svg_fade_in_top = $svg_fade_in.offset().top,
				$svg_fade_in_items = $svg_fade_in.find('path, line, polyline, polygon, circle, rect, image, .horizontal-scroll, .animate-groups > g'),
				items_pos = [];
			
			
			$svg_fade_in_items.each(function(index){
				var $this = $(this),
					offset = $this.data('offset');
				
				offset = (typeof offset !== 'undefined' ? parseInt(offset) : 0);
				
				items_pos[index] = {
					top: $this.offset().top + offset,
					element: $this
				};
			});
			
			$(window).on('scroll',function(){
				var scroll_top = $(window).scrollTop() + window.innerHeight;
				
				if($svg_fade_in_top < scroll_top){
					items_pos.forEach(function(item){
						if(item.top < scroll_top - 100)
							item.element.addClass('show');
						else
							item.element.removeClass('show');
					});
				}
			});
		}
		
		if($body.hasClass('page-template-cbl')/* && window.innerWidth < 1200*/)
			$('#map-svg .elements > g:first-child').each(function(){
				var $this = $(this),
					$children = $this.children(),
					children_l = $children.length;
				
				$children.css('transition-delay', function(i){
					return 2 / children_l * i + 's';
				});
			});
		
		$('.scroll-show')
			.scrollShow({
				children: '#map-svg .elements',
				activeClass: ['fadeIn', 'fadeOut'],
				once: true
			})
			.find('.st13')
			.hover(function(){
				$(this).parent().addClass('hover');
			}, function(){
				$(this).parent().removeClass('hover')
			});
		
		if(window.innerWidth > 991)
			$('#cbl-header .video').YTPlayer();
		
		if(window.innerWidth < 400){
			$('#news-facebook iframe').each(function(){
				$(this).height(this.contentWindow.document.body.offsetHeight);
			});
		}
	});
	
	var $popup = $('#popup');
	
	if($popup.length > 0){
		$popup
			.find('.close, .popup-toggle')
			.on('click', toggle_popup);
		
		function toggle_popup(){
			$body.toggleClass('popup-open');
			
			return false;
		}
	}
	
	function page_loaded(){
		$body.addClass('loaded');
	}
})(jQuery);