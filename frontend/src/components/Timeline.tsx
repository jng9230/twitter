import React from 'react'
import Tweet from './Tweet'

const Timeline = () => {
  return (
    <div className="h-screen overflow-scroll">
      <Tweet tweet={{
        profileID: "",
        profileImg: "",
        uniqueName: "bingBong",
        username: "bing bong bong",
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: 4342,
        time: new Date()
      }}/>
      <Tweet tweet={{
        profileID: "",
        profileImg: "",
        uniqueName: "bingBong",
        username: "bing bong bong bing bong bong bing bong bong",
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: 4342,
        time: new Date(1)
      }} />
        <div className="h-auto bg-pink-50"> 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius est obcaecati, vero nobis quis corrupti aliquam accusantium expedita earum deleniti voluptates, sed minus officia aliquid, dolorum exercitationem quo sequi at.
        </div>
    </div>
  )
}

export default Timeline
