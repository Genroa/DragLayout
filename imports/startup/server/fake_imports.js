
import '../../api/layout/collections.js';

console.log("running fake imports...");

Content.remove({});
Page.remove({});

var content1 = new Content({showInContentManagement: false});
content1.save();

var content2 = new TextContent({text: "Ceci est un bloc de contenu texte. Il est même très très long. Trèèèèèès long, non? Je trouve perso. Lorem ipsum...bon d'accord j'arrête."});
content2.save();

var block1 = new ContentBlock({content: content1._id});
var block2 = new ContentBlock({content: content2._id});

var column1 = new ContentColumn({blocks: [block1, block2]});
var column2 = new ContentColumn({blocks: []});
var column3 = new ContentColumn({blocks: []});
var column4 = new ContentColumn({blocks: []});

var section1 = new ContentSection({columns: [column1, column2, column3]});
var section2 = new ContentSection({columns: [column4]});

var layout1 = new PageLayout({sections: [section1, section2]});

var page = new Page({layout: layout1});
page.save();


console.log("done.");