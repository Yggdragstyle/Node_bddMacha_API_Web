/*

	Yggdragstyle
	ygg.life

	Script of JSON Formater

*/



    console.log('script OK\n');

jQuery(function($){

  $(document).ready(function(){
    // - - - - - - - - - - -
   	
    console.log('Start application Web service :\n');


   // Récupération des données depuis le Web Service
   	$.getJSON("http://mobile-courses-server.herokuapp.com/courses")
   		.done(data => {

        // console.log(data);

        var targ = $('#resulta'), resulta = "";

        $.each(data, (idx, elm) => {
        
          // console.log(elm);
          
          resulta += '<li><h3>' + elm.title + '</h3><table>';

          $.each(elm, (key, row) => { 

            // console.log(row);

     				if(key != 'title') { resulta += '<tr><td>' + key + '</td><td>' + row + '</td></tr>'; }

     			});

   		  resulta += '</table></li>';
   	 	
      });

	 	targ.append(resulta);

   	}).fail( ()=> { console.log('Big fail...  I\'m so sorry Macha ! :/'); });
   	// Fin du Web service
   	 	


	console.log('End of application');
   
    // - - - - - - - - - - -
  });

});
