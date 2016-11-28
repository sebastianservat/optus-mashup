/*
 * Bootstrap-based responsive mashup
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */

var app;

var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
//to avoid errors in dev-hub: you can remove this when you have added an app
	var app;
	require.config( {
		baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
	} );

require( ["js/qlik"], function ( qlik ) {

	var control = false;
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		if ( !control ) {
			control = true;
			$( '#popup' ).delay( 1000 ).fadeIn( 1000 ).delay( 11000 ).fadeOut( 1000 );
		}
	} );
	$( "body" ).css( "overflow: hidden;" );
	function AppUi ( app ) {
		var me = this;
		this.app = app;
		app.global.isPersonalMode( function ( reply ) {
			me.isPersonalMode = reply.qReturn;
		} );
		app.getAppLayout( function ( layout ) {
			$( "#title" ).html( layout.qTitle );
			$( "#title" ).attr( "title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
			//TODO: bootstrap tooltip ??
		} );
		app.getList( 'SelectionObject', function ( reply ) {
			$( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
			$( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
		} );
		app.getList( "BookmarkList", function ( reply ) {
			var str = "";
			reply.qBookmarkList.qItems.forEach( function ( value ) {
				if ( value.qData.title ) {
					str += '<li><a data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
				}
			} );
			str += '<li><a data-cmd="create">Create</a></li>';
			$( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
				var id = $( this ).data( 'id' );
				if ( id ) {
					app.bookmark.apply( id );
				} else {
					var cmd = $( this ).data( 'cmd' );
					if ( cmd === "create" ) {
						$( '#createBmModal' ).modal();
					}
				}
			} );
		} );
		$( "[data-qcmd]" ).on( 'click', function () {
			var $element = $( this );
			switch ( $element.data( 'qcmd' ) ) {
				//app level commands
				case 'clearAll':
					app.clearAll();
					break;
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
				case 'lockAll':
					app.lockAll();
					break;
				case 'unlockAll':
					app.unlockAll();
					break;
				case 'createBm':
					var title = $( "#bmtitle" ).val(), desc = $( "#bmdesc" ).val();
					app.bookmark.create( title, desc );
					$( '#createBmModal' ).modal( 'hide' );
					break;
			}
		} );
	}

	//callbacks -- inserted here --
	//open apps -- inserted here --
	app = qlik.openApp('OptusFixTower.qvf', config);

	//get objects -- inserted here --

	//Home KPI
	app.getObject('qsChart01','vcPhxj');
	app.getObject('qsChart02','LBPhwm');	
	app.getObject('qsChart03','HxKRB');	
	app.getObject('qsChart04','nJTbgpC');	
	app.getObject('qsChart05','mtZkzbV');	
	app.getObject('qsChart06','tQjYx');	




	app.getObject('CurrentSelections','CurrentSelections');

	//Filters
	
	//app.getObject('qsFilter01','tTmMzh');

	app.getObject('qsFilter01','pynnNhg');
	app.getObject('qsFilter02','pNHeNc');
	app.getObject('qsFilter03','YsFHyD');
	app.getObject('qsFilter04','gEkUZu');
	app.getObject('qsFilter05','qJeExW');

	


	//Chart Dynamic Tytle
	app.createGenericObject( {
		vTableTitle: {
			qStringExpression  : "=$(vTableTitle)"
		}
	}, function ( reply ) {
		if ( 1==1/*reply.ST1Fail*/ ) {
			document.getElementById("vTableTitle").innerHTML = reply.vTableTitle;			
		}
	});		
	//End Chart Dynamic Tytle

//Critical Orders//
	app.createGenericObject( {
		ST1CriticalOrder: {
			qValueExpression : "=$(mST1CriticalOrder)"
		},
		ST2CriticalOrder: {
			qValueExpression : "=$(mST2CriticalOrder)"
		},
		ST3CriticalOrder: {
			qValueExpression : "=$(mST3CriticalOrder)"
		},
		ST4CriticalOrder: {
			qValueExpression : "=$(mST4CriticalOrder)"
		},
		ST5CriticalOrder: {
			qValueExpression : "=$(mST5CriticalOrder)"
		},
		ST6CriticalOrder: {
			qValueExpression : "=$(mST6CriticalOrder)"
		},
		ST7CriticalOrder: {
			qValueExpression : "=$(mST7CriticalOrder)"
		},
		ST8CriticalOrder: {
			qValueExpression : "=$(mST8CriticalOrder)"
		}														

	}, function ( reply ) {
		if ( 1==1/*reply.ST1Fail*/ ) {
			console.log(reply.ST1CriticalOrder);
			document.getElementById("mST1CriticalOrder").innerHTML = reply.ST1CriticalOrder;		
			document.getElementById("mST2CriticalOrder").innerHTML = reply.ST2CriticalOrder;
			document.getElementById("mST3CriticalOrder").innerHTML = reply.ST3CriticalOrder;			
			document.getElementById("mST4CriticalOrder").innerHTML = reply.ST4CriticalOrder;			
			document.getElementById("mST5CriticalOrder").innerHTML = reply.ST5CriticalOrder;			
			document.getElementById("mST6CriticalOrder").innerHTML = reply.ST6CriticalOrder;			
			document.getElementById("mST7CriticalOrder").innerHTML = reply.ST7CriticalOrder;			
			document.getElementById("mST8CriticalOrder").innerHTML = reply.ST8CriticalOrder;									
		}
	});	
//End Critical Orders//

//Step1 KPIs//
	app.createGenericObject( {
		ST1Fail: {
			qValueExpression : "=$(mST1Fail)"
		},
		ST1DYL: {
			qValueExpression: "=$(mST1DYL)"
		},
		ST1EXC: {
			qValueExpression: "=$(mST1EXC)"
		},
		ST1NRD: {
			qValueExpression: "=$(mST1NRD)"
		}
	}, function ( reply ) {
		if ( 1==1/*reply.ST1Fail*/ ) {
			document.getElementById("mST1Fail").innerHTML = reply.ST1Fail;
			document.getElementById("mST1DYL").innerHTML = reply.ST1DYL;
			document.getElementById("mST1EXC").innerHTML = reply.ST1EXC;
			document.getElementById("mST1NRD").innerHTML = reply.ST1NRD;			
		}
	});	
//End Step1 KPIs//

//Step2 KPIs//
	app.createGenericObject( {
		ST2Fail: {
			qValueExpression : "=$(mST2Fail)"
		},
		ST2DYL: {
			qValueExpression: "=$(mST2DYL)"
		},
		ST2EXC: {
			qValueExpression: "=$(mST2EXC)"
		},
		ST2NRD: {
			qValueExpression: "=$(mST2NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST2Fail").innerHTML = reply.ST2Fail;
			document.getElementById("mST2DYL").innerHTML = reply.ST2DYL;
			document.getElementById("mST2EXC").innerHTML = reply.ST2EXC;
			document.getElementById("mST2NRD").innerHTML = reply.ST2NRD;			
		}
	});	
//End Step2 KPIs//

//Step3 KPIs//
	app.createGenericObject( {
		ST3Fail: {
			qValueExpression : "=$(mST3Fail)"
		},
		ST3DYL: {
			qValueExpression: "=$(mST3DYL)"
		},
		ST3EXC: {
			qValueExpression: "=$(mST3EXC)"
		},
		ST3NRD: {
			qValueExpression: "=$(mST3NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST3Fail").innerHTML = reply.ST3Fail;
			document.getElementById("mST3DYL").innerHTML = reply.ST3DYL;
			document.getElementById("mST3EXC").innerHTML = reply.ST3EXC;
			document.getElementById("mST3NRD").innerHTML = reply.ST3NRD;			
		}
	});			
//End Step3 KPIs//

//Step4 KPIs//
	app.createGenericObject( {
		ST4Fail: {
			qValueExpression : "=$(mST4Fail)"
		},
		ST4DYL: {
			qValueExpression: "=$(mST4DYL)"
		},
		ST4EXC: {
			qValueExpression: "=$(mST4EXC)"
		},
		ST4NRD: {
			qValueExpression: "=$(mST4NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST4Fail").innerHTML = reply.ST4Fail;
			document.getElementById("mST4DYL").innerHTML = reply.ST4DYL;
			document.getElementById("mST4EXC").innerHTML = reply.ST4EXC;
			document.getElementById("mST4NRD").innerHTML = reply.ST4NRD;			
		}
	});			
//End Step4 KPIs//

//Step5 KPIs//
	app.createGenericObject( {
		ST5Fail: {
			qValueExpression : "=$(mST5Fail)"
		},
		ST5DYL: {
			qValueExpression: "=$(mST5DYL)"
		},
		ST5EXC: {
			qValueExpression: "=$(mST5EXC)"
		},
		ST5NRD: {
			qValueExpression: "=$(mST5NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST5Fail").innerHTML = reply.ST5Fail;
			document.getElementById("mST5DYL").innerHTML = reply.ST5DYL;
			document.getElementById("mST5EXC").innerHTML = reply.ST5EXC;
			document.getElementById("mST5NRD").innerHTML = reply.ST5NRD;			
		}
	});			
//End Step5 KPIs//

//Step6 KPIs//
	app.createGenericObject( {
		ST6Fail: {
			qValueExpression : "=$(mST6Fail)"
		},
		ST6DYL: {
			qValueExpression: "=$(mST6DYL)"
		},
		ST6EXC: {
			qValueExpression: "=$(mST6EXC)"
		},
		ST6NRD: {
			qValueExpression: "=$(mST6NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST6Fail").innerHTML = reply.ST6Fail;
			document.getElementById("mST6DYL").innerHTML = reply.ST6DYL;
			document.getElementById("mST6EXC").innerHTML = reply.ST6EXC;
			document.getElementById("mST6NRD").innerHTML = reply.ST6NRD;			
		}
	});			
//End Step6 KPIs//

//Step7 KPIs//
	app.createGenericObject( {
		ST7Fail: {
			qValueExpression : "=$(mST7Fail)"
		},
		ST7DYL: {
			qValueExpression: "=$(mST7DYL)"
		},
		ST7EXC: {
			qValueExpression: "=$(mST7EXC)"
		},
		ST7NRD: {
			qValueExpression: "=$(mST7NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST7Fail").innerHTML = reply.ST7Fail;
			document.getElementById("mST7DYL").innerHTML = reply.ST7DYL;
			document.getElementById("mST7EXC").innerHTML = reply.ST7EXC;
			document.getElementById("mST7NRD").innerHTML = reply.ST7NRD;			
		}
	});			
//End Step7 KPIs//

//Step8 KPIs//
	app.createGenericObject( {
		ST8Fail: {
			qValueExpression : "=$(mST8Fail)"
		},
		ST8DYL: {
			qValueExpression: "=$(mST8DYL)"
		},
		ST8EXC: {
			qValueExpression: "=$(mST8EXC)"
		},
		ST8NRD: {
			qValueExpression: "=$(mST8NRD)"
		}
	}, function ( reply ) {
		if ( 1==1 ) {
			document.getElementById("mST8Fail").innerHTML = reply.ST8Fail;
			document.getElementById("mST8DYL").innerHTML = reply.ST8DYL;
			document.getElementById("mST8EXC").innerHTML = reply.ST8EXC;
			document.getElementById("mST8NRD").innerHTML = reply.ST8NRD;			
		}
	});			
//End Step8 KPIs//

} );




function selectActivities(Step,Status){	
	app.field('StepID').selectValues([Step], true);
	app.field('Status Grp').selectValues([Status], true, true);
}

//Export
function Export(){
	//console.log(id);
	app.getObject('LBPhwm').then(function(model) {  
	var table = qlik.table(model);  
	table.exportData({download: true});  
	}) 	
}	

 





function ModalContent(id){
	app.getObject('QVM01',id);	
	app.variable.setNumValue("vVaraible",2);	
}

function changeVariable(id){	
	app.variable.setNumValue("vVaraible",id);
	app.variable.getLayout("vVaraible");
	//app.variable.getContent('QVV01','vVaraible')
}

function toggleVarvDolCusAcc(id){	
	app.variable.setNumValue("vDolCusAcc",id);
}

function toggleVarvScale(id){	
	app.variable.setNumValue("vScale",id);
	app.field('Stage').selectValues(["Modem Delivery"], true, true);

}


