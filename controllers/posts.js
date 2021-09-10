const axios = require('axios')
const ErrorResponse = require("../utils/errorResponse");

exports.getPost = async (req, res, next) => {
    
    let accpetSortFields = ['id','reads','likes','popularity']
    let accpetDirectionFields = ['desc','asc']

    let {tags, sortBy, direction} = req.query;


    if (!tags||tags==='') {
        return next(new ErrorResponse("Tags parameter is required", 400));
    }

    if (!sortBy) {
        sortBy='id'
    } else if (!accpetSortFields.includes(sortBy)) {
        return next(new ErrorResponse("sortBy parameter is invalid", 400));
    }

    if (!direction) {
        direction='asc'
    } else if (!accpetDirectionFields.includes(direction)) {
        return next(new ErrorResponse("direction parameter is invalid", 400));

    }

    let tagArray = tags.trim().split(',').map((a)=> {return a.trim()})
 
    let apiArray = tagArray.map( (e) => {return APIcall(e) } )


    let posts;
    try {
        posts = await Promise.all(apiArray); // It returns an array containing each promise solution in the same order.
    } catch (error) {
        console.error(error)
    }

    let container=[];
    posts.forEach(ele => {
        container = [...container, ...ele.data.posts];   
    });

    container = container.filter((elem, index, arr_sefl) => arr_sefl.findIndex(el => (el.id === elem.id)) === index )


    // sortBy id by default
    direction === 'desc' ? container.sort(function(a,b) {
        return b[sortBy] -a[sortBy];
    }) : container.sort(function(a,b) {
        return a[sortBy]-b[sortBy];
    });


    res.status(200).json({
        posts: container,
      });
   };

  const APIcall = async (tag) => {
    return axios.get(process.env.HATCHWAY_API,{
        params: {
            tag: tag
        }
    })
  }