import React from 'react'
import { User, UserNetwork } from '../utils/APITypes'

const ProfileBlock = ({
  user,
  userNetwork
}:{
  user: User
  userNetwork: UserNetwork
}) => {
  return (
    <div className="mb-10">
      <div className="bg-gray-400 w-full h-32"></div>
      <div className="relative p-2">
        <img src={user.profileImg} alt="" className="rounded-full h-auto w-20 absolute -top-10"/>
        <div className="relative top-10">
          <div>
            <div>
              {user.username}
            </div>
            <div className="text-twitter-gray">
              @{user.handle}
            </div>
          </div>
          <div>
            <span className="mr-1">
              {userNetwork.following.length}
            </span>
            <span className="text-twitter-gray mr-3">
              Following
            </span>
            <span className="mr-1">
              {userNetwork.followers.length}
            </span>
            <span className="text-twitter-gray">
              Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBlock
