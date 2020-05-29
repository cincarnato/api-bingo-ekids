require('./mongo.js')

const {createItem} = require('./services/ItemService')

async function create(){


Promise.all([
    createItem("apple"), 
    createItem("broccoli"), 
    createItem("burger"),
    createItem("cake"),
    createItem("cauliflower"),
    createItem("cheese"),
    createItem("chicken"),
    createItem("chocolate"),
    createItem("cupcake"),
    createItem("grapes"),
    createItem("milk"),
    createItem("noodles"),
    createItem("onion"), 
    createItem("orange"),
    createItem("pear"),
    createItem("pineapple"),
    createItem("pork"),
    createItem("sandwich"),
    createItem("tomato"),
    createItem("watermelon"),
    createItem("coffee"),
    createItem("tea"),
    createItem("cherry"),
    createItem("milkshake"),
    createItem("ice-cream"),
    createItem("lettuce"),
    createItem("carrot"),
    createItem("cereal"),
    createItem("bread"),
    createItem("sausages"),
    createItem("water"),
    createItem("lemonade"),
    createItem("honey"),
    createItem("cucumber"),
    createItem("strawberry")
    
]).then(val => {
        console.log("ALL CREATE DONE")
        process.exit()
    })
}


create()