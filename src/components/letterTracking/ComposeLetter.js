import React from 'react'
import { Grid, Button } from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { PageHead } from './../uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import jnnLogo from './../../../public/img/logo.png'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { letterTracking } from './../helpers/CommonHelper'

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
   	karma: {
		normal: 'karma.ttf',
		bold: 'karma.ttf',
     	italics: 'karma.ttf',
     	bolditalics: 'karma.ttf'
   	},
   	utsaah: {
		normal: 'utsaah.ttf',
		bold: 'utsaah.ttf',
     	italics: 'utsaah.ttf',
     	bolditalics: 'utsaah.ttf'
   	},
   	roboto: {
		normal: 'roboto.ttf',
		bold: 'roboto.ttf',
     	italics: 'roboto.ttf',
     	bolditalics: 'roboto.ttf'
   	}
}

class ComposeLetter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			editorState: EditorState.createEmpty(),
		}

		this.handlePdfGeneration = this.handlePdfGeneration.bind(this)
		this.onEditorStateChange = this.onEditorStateChange.bind(this)
		this.handleViewLetter = this.handleViewLetter.bind(this)
		this.handlePrintLetter = this.handlePrintLetter.bind(this)
		this.handleSaveDraft = this.handleSaveDraft.bind(this)
	}

	handleViewLetter() {
		// this.handlePdfGeneration()
		// pdfForElement('test').download();
		pdfForElement('test')
		function pdfForElement(id) {
			function ParseContainer(cnt, e, p, styles) {
	    		var elements = []
			    var children = e.childNodes
			    if (children.length != 0) {
		      		for (var i = 0; i < children.length; i++) p = ParseElement(elements, children[i], p, styles)
			    }
			    if (elements.length != 0) {
		      		for (var i = 0; i < elements.length; i++) cnt.push(elements[i])
			    }
			    return p
		  	}

		  	function ComputeStyle(o, styles) {
			    for (var i = 0; i < styles.length; i++) {
		      		var st = styles[i].trim().toLowerCase().split(":");
			      	if (st.length == 2) {
			        	switch (st[0]) {
		          			case "font-size": {
		              			o.fontSize = parseInt(st[1]);
			              		break
			            	}
			          		case "text-align": {
				              	switch (st[1]) {
				                	case "right":
				                  	o.alignment = 'right';
				                  	break;

				                	case "center":
				                  	o.alignment = 'center';
				                  	break;
				              	}
			              		break;
			            	}
			          		case "font-weight": {
		              			switch (st[1]) {
			                		case "bold":
			                  		o.bold = true;
			                  		break;
			              		}
			              		break;
			            	}
			          		case "text-decoration": {
		              			switch (st[1]) {
			                	case "underline":
			                  		o.decoration = "underline"
			                  		break
			              		}
			              		break
			            	}
			          		case "font-style": {
			              		switch (st[1]) {
			                	case "italic":
			                  		o.italics = true;
			                  		break;
			              		}
			              		break
			            	}
			        	}
			      	}
			    }
		  	}

		  	function ParseElement(cnt, e, p, styles) {
			    if (!styles) styles = []
			    if (e.getAttribute) {
		      		var nodeStyle = e.getAttribute("style")
			      	if (nodeStyle) {
			        	var ns = nodeStyle.split(";")
			        	for (var k = 0; k < ns.length; k++) styles.push(ns[k])
			      	}
			    }

			    switch (e.nodeName.toLowerCase()) {
			      	case "#text": {
			          	var t = {
	            			text: e.textContent.replace(/\n/g, "")
			          	};
			          	if (styles) ComputeStyle(t, styles)
			          	p.text.push(t)
			          	break;
			        }
			      	case "b":
			      	case "strong": {
		          		ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]))
			          	break;
			        }
			        case "ins":
			      	case "u": {
			          	ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]))
			          	break;
			        }
			      	case "i": {
			          ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]))
			          break;
			        }
			      	case "span": {
		          		ParseContainer(cnt, e, p, styles)
			          	break;
			        }
			      	case "br":{
			          p = CreateParagraph()
			          cnt.push(p);
			          break;
			        }
			      	case "div":
			      	case "p": {
		          		p = CreateParagraph()
			          	var st = {
			            	stack: []
			          	}
			          	st.stack.push(p)
			          	ComputeStyle(st, styles)
			          	ParseContainer(st.stack, e, p)

			          	cnt.push(st)
			          	break
			        }
			      	default: {
          		  		console.log("Parsing for node " + e.nodeName + " not found")
			          	break
			        }
			    }
			    return p
		  	}

			function ParseHtml(cnt, htmlText) {
			    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""))
			    var p = CreateParagraph()
			    for (var i = 0; i < html.length; i++) ParseElement(cnt, html.get(i), p)
			}

		  	function CreateParagraph() {
			    var p = {
		      		text: []
			    }
			    return p;
		  	}
			  
		  	var content = [];
			ParseHtml(content, document.getElementById(id).outerHTML)
			return pdfMake.createPdf({ 
				content: [
			        {
		      			image: jnnLogo,
		      			width: 70,
		      			height: 70,
		      			alignment: 'left',
		      			// absolutePosition: {x: 60, y: 20}
	      			},
			        {
			        	text: 'कार्यालय जयपुर नगर निगम',
			        	style: 'header',
	      				// absolutePosition: {x: 200, y: 30}
			        },
			        {
			        	text: '(पंडित दीनदयाल उपाधया भवन, लालकोठी, टोंक रोड जयपुर-15)',
			        	style: 'subHeader',
			        	// absolutePosition: {x: 190, y: 60}
			        },
			        {
			        	text: 'क्रमांक - एफ-6()उपा.राज.(सा.प्रा)/ला.शाखा/जननि/2018/',
			        	// absolutePosition: {x: 60, y: 90}
			        },
			        {
			        	text: 'दिनांक - 23/04/2018',
			        	// absolutePosition: {x: 400, y: 90}
			        },
		        	content
    			], 
    			defaultStyle: {
	  		        font: 'utsaah',
	  		        fontSize: 15,
	  		        alignment: 'justify'
		    	},
			    styles: {
			    	header: {
			    		bold: true,
	    				fontSize: 25,
	    				alignment: 'left',
	    			},
	    			subHeader: {
	    				fontSize: 15
	    			},
	    			subject: {
	    				position: 'relative'
	    			},
	    			bottom: {
	    				alignment: 'right'
	    			}
			    }
		    }).open()
		}
	}

	handlePrintLetter() {
		this.handlePdfGeneration()
	}

	handleSaveDraft() {
		localStorage.setItem('letterData', letterTracking.getLetterData(this.state.editorState))
	}

  	handlePdfGeneration() {
  		var pdfLayout = {
  			pageSize: 'A4',
  		    content: [
  		        {
        			image: jnnLogo,
        			width: 70,
        			height: 70,
        			alignment: 'left',
        			absolutePosition: {x: 60, y: 20}
        		},
  		        {
  		        	text: 'कार्यालय जयपुर नगर निगम',
  		        	style: 'header',
        			absolutePosition: {x: 200, y: 30}
  		        },
  		        {
  		        	text: '(पंडित दीनदयाल उपाधया भवन, लालकोठी, टोंक रोड जयपुर-15)',
  		        	style: 'subHeader',
  		        	absolutePosition: {x: 190, y: 60}
  		        },
  		        {
  		        	text: 'क्रमांक - एफ-6()उपा.राज.(सा.प्रा)/ला.शाखा/जननि/2018/',
  		        	absolutePosition: {x: 60, y: 90}
  		        },
  		        {
  		        	text: 'दिनांक - 23/04/2018',
  		        	absolutePosition: {x: 400, y: 90}
  		        },
  		        {
  		        	text: 'प्रबंधक,',
  		        	absolutePosition: {x: 60, y: 130}
  		        },
  		        {
  		        	text: 'स्मार्ट राज,',
  		        	absolutePosition: {x: 60, y: 145}
  		        },
  		        {
  		        	text: 'नगर निगम जयपुर |',
  		        	absolutePosition: {x: 60, y: 160}
  		        },
  		        {
  		        	style: 'subject',
  		        	stack: [
		  		        {
		  		        	// subject heading
		  		        	text: 'विषय:-',
		  		        	absolutePosition: {x: 100, y: 200}
		  		        },
		  		        {
		  		        	// subject content
		  		        	text: 'गए, उनका एक समय में बड़ा नाम था। पूरे देश में तालाब बनते थे बनाने वाले भी पूरे देश में थे। कहीं यह विद्या जाति के विद्यालय | सिखाई जाती थी तो कहीं यह जात से हट कर एक विशेष पांत भी जाती थी। बनाने वाले लोग कहीं एक जगह बसे मिलते थे तो कहीं -घूम कर',
		  		        	absolutePosition: {x: 140, y: 200}
		  		        }
	  		        ]
	  		    },
  		        {
  		        	style: 'content',
  		        	stack: [
	  		        	{
	  		        		text: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace(/<(?:.|\n)*?>/gm, ''),
	  		        		absolutePosition: {x: 60, y: 250}
	  		        	},
  		        	]
  		   	 	},
  		        {
  		        	style: 'bottom',
  		        	stack: [
	  		        	{
	  		        		text: 'उपयुक्त राजस्व (प्रथम)',
	  		        		absolutePosition: {y: 750},
	  		        	},
	  		        	{
	  		        		text: 'नगर निगम जयपुर |',
	  		        		absolutePosition: {y: 770},
	  		        	}
  		        	]
  		   	 	}
  		    ],
  		    defaultStyle: {
  		        font: 'utsaah',
  		        fontSize: 15,
  		        alignment: 'justify'
		    },
		    styles: {
		    	header: {
		    		bold: true,
    				fontSize: 25,
    				alignment: 'left',
    			},
    			subHeader: {
    				fontSize: 15
    			},
    			subject: {
    				position: 'relative'
    			},
    			bottom: {
    				alignment: 'right'
    			}
		    }
  		}
  		pdfMake.createPdf(pdfLayout).open()
  	}

  	onEditorStateChange(editorState) {
  		this.setState({ editorState }, () => {
			console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
  		})
  	}

	render() {
		return (
			<Grid bsClass='compose-letter'>
				<BreadcrumbsItem glyph='compose' to={'/servicePanel/letterTracking/composeLetter'}> Compose Letter </BreadcrumbsItem>
				<PageHead title='Compose Letter' />
				<Editor
					editorState={this.state.editorState}
					toolbarClassName="toolbar-class"
					wrapperClassName="wrapper-class"
			        editorClassName="editor-class"
					onEditorStateChange={this.onEditorStateChange}
				/>
				<Grid bsClass="pull-right">
					<Button className="btn-primary" onClick={this.handleViewLetter}>View Letter</Button>
					<Button className="btn-primary margin-vert-1x" onClick={this.handlePrintLetter}>Print Letter</Button>
					<Button className="btn-primary" onClick={this.handleSaveDraft}>Save as draft</Button>
				</Grid>
				<Grid id="test" bsClass="hidden">
					<div id="test" dangerouslySetInnerHTML={{__html:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}}>
					</div>
				</Grid>
			</Grid>
		)
	}
}

export default ComposeLetter