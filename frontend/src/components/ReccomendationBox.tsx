import React, { useEffect, useState } from 'react'
import { config } from '../utils/config'
import { Link } from 'react-router-dom'
import { User } from '../utils/APITypes'
import { followUser, getReccs } from '../utils/APICalls'
const ReccomendationBox = ({
  user
}: {
  user: User
}) => {

  const [reccs, setReccs] = useState<User[]>();
  useEffect(() => {
    getReccs(user._id)
      .then(d => setReccs(d))
  }, [user])

  const handleFollow = (idToFollow:string) => {
    followUser(user._id, idToFollow)
      .then(d => {
        // console.log(d)
        //remove followed user from recommendations
        setReccs(reccs?.filter(d => d._id !== idToFollow))
      })
  }

  return (
    <div className="sticky top-0 space-y-3">
      <h1 className="text-xl"> Who to follow </h1>
      {
        reccs?.map((d: User) => {
          const profileImg = d.profileImg && d.profileImg !== "" ? d.profileImg
            : config.DEFAULT_PROFILE_IMG
          return (
            <div className="flex w-full items-center justify-between" key={d._id}>
              <Link to={`/${d.handle}`} className="flex gap-3">
                <div>
                  <img src={profileImg} alt="" className="w-11 h-auto rounded-full" />
                </div>
                <div>
                  <div> {d.username} </div>
                  <div> @{d.handle} </div>
                </div>
              </Link>
              <div>
                <button className="text-white bg-black px-3 py-2 rounded-full" onClick={() => handleFollow(d._id)}>
                  Follow
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ReccomendationBox
