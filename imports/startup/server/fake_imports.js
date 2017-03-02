
import '../../api/layout/collections.js';

console.log("running fake imports...");

Content.remove({});
Page.remove({});

newPage = function(pageName, pageId) {
	let content1 = new Content({showInContentManagement: false});
	content1.save();

	let content2 = new TextContent({text: "Ceci est un bloc de contenu texte. Il est même très très long. Trèèèèèès long, non? Je trouve perso. Lorem ipsum...bon d'accord j'arrête.", name: "Texte démo"});
	content2.save();

	let block1 = new ContentBlock({content: content1._id});
	let block2 = new ContentBlock({content: content2._id});

	let column1 = new ContentColumn({blocks: [block1, block2]});
	let column2 = new ContentColumn({blocks: []});
	let column3 = new ContentColumn({blocks: []});
	let column4 = new ContentColumn({blocks: []});

	let section1 = new ContentSection({columns: [column1, column2, column3]});
	let section2 = new ContentSection({columns: [column4]});

	let layout1 = new PageLayout({sections: [section1, section2]});

	let page = new Page({layout: layout1, name: pageName, id: pageId});
	page.save();
}

newPage("Accueil", "index");
newPage("A Propos", "apropos");

console.log("done.");