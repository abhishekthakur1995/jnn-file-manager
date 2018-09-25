import React from 'react'
import { Grid } from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { PageHead } from './../uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import jnnLogo from './../../../public/img/logo.png'
pdfMake.vfs = pdfFonts.pdfMake.vfs

class ComposeLetter extends React.Component {
	constructor(props) {
		super(props)

		this.handlePdfGeneration = this.handlePdfGeneration.bind(this)
	}

  	handlePdfGeneration() {
  		pdfMake.fonts = {
  		   	karma: {
	     		normal: 'utsaah.ttf',
	     		bold: 'karma.ttf',
  		     	italics: 'karma.ttf',
  		     	bolditalics: 'karma.ttf'
  		   	},
  		   	roboto: {
	     		normal: 'roboto.ttf',
	     		bold: 'roboto.ttf',
  		     	italics: 'roboto.ttf',
  		     	bolditalics: 'roboto.ttf'
  		   	}
	   	}
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
  		        font: 'karma',
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

  	componentDidMount() {
  		this.handlePdfGeneration()
  	}

	render() {
		return (
			<Grid bsClass='compose-letter'>
				<BreadcrumbsItem glyph='compose' to={'/servicePanel/letterTracking/composeLetter'}> Compose Letter </BreadcrumbsItem>
				<PageHead title='Compose Letter' />
			</Grid>
		)
	}
}

export default ComposeLetter