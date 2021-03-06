/*!
 * jQuery getcontents.js 
 * 
 * Scope: Displaying an RSS(like) JSON feed 
 *
 * Time-stamp: "2014-10-09 17:49:47 zimmel"
 * 
 * @author Daniel Zimmel <zimmel@coll.mpg.de>
 * @copyright 2014 MPI for Research on Collective Goods, Library
 * @license http://www.gnu.org/licenses/gpl.html GPL version 3 or higher
 */

$(document).ready(function() {
		
		/* your API goes here */
		var myURL = 'rsslike.json';

		/* get contents */
		(function() {
				$('#response').children().remove();
				
				$('#main-content-switcher').fadeIn('slow');
				
				$('#main-content .loader').fadeIn();
				
				$.ajax({
						url: myURL,
						dataType: 'jsonp',
						jsonp: false,
						jsonpCallback: "featured"
				}).done(function(returnData) {
						$('#main-content .loader').fadeOut();
						var itemData = returnData.channel.item;
						$.each(itemData, function (index, value) {
								var no = index+1; 
								var sysno = value.link.substr(value.link.length - 6);

								$cl = $('#newitemTemplate div.newitem').clone();
                $($cl).attr('id','item-'+no);
								$('.pubdate.row', $cl).text(value.pubDate.replace("00:00:00 CEST",""));
								$('a.title', $cl).attr('href',value.link);
								$('a.title', $cl).text(value.title);
								$('.description', $cl).html(value.description);
								$('.cover img', $cl).attr('id',sysno);
//								$('.cover img', $cl).attr('src','img/cover/'+sysno+'.jpg');
								$('.cover img', $cl).attr('src','img/bgcoll-logo.png');
								$cl.appendTo('#response').fadeIn();
								
								$.each(value.authors, function(i, author) {
										//console.log(author);
										var authorImg = author.substr(0, author.indexOf(',')).toLowerCase();
										$('#item-'+no+' div.authors').append('<span class="author">'+author+'</span><br/></div>');
								});

								// when an error happens on image loading:
								// $('#'+sysno).error(function() { 
								// 		$(this).attr('src','img/bgcoll-logo.png');
								// });
								$('img.author').error(function() { 
										// remove img:
										$(this).remove(); 
								});
						});

						/* attach slick slider */
						$('#response').slick({   
								slidesToShow: 1,
								slidesToScroll: 1, 
								autoplay: true, 
								speed: 600, 
								fade: false,
								useCSS: true,
								//easing: 'easeOutBack',
								vertical: false,
								autoplaySpeed: 10000
						});

				})
						.fail(function() {
								$('#response').append('<div class="error">there was an error!</div>');
						});
		}())

});





