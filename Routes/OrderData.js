const express=require('express')
const router =express.Router()
const Order =require('../models/Order')


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

module.exports=router;



// router.post('/getlocation', async (req, res) => {
//     try {
//         let lat = req.body.latlong.lat
//         let long = req.body.latlong.long
//         console.log(lat, long)
//         let location = await axios
//             .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
//             .then(async res => {
//                 // console.log(`statusCode: ${res.status}`)
//                 console.log(res.data.results)
//                 // let response = stringify(res)
//                 // response = await JSON.parse(response)
//                 let response = res.data.results[0].components;
//                 console.log(response)
//                 let { village, county, state_district, state, postcode } = response
//                 return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
//             })
//             .catch(error => {
//                 console.error(error)
//             })
//         res.send({ location })

//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })
// router.post('/foodData', async (req, res) => {
//     try {
//         // console.log( JSON.stringify(global.foodData))
//         // const userId = req.user.id;
//         // await database.listCollections({name:"food_items"}).find({});
//         res.send([global.foodData, global.foodCategory])
//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })

// router.post('/myOrderData', async (req, res) => {
//     try {
//         console.log(req.body.email)
//         let eId = await Order.findOne({ 'email': req.body.email })
//         //console.log(eId)
//         res.json({orderData:eId})
//     } catch (error) {
//         res.send("Error",error.message)
//     }
    

// });

// module.exports = router
