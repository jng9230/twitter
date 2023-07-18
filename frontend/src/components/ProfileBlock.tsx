import { User } from '../utils/APITypes'
import { config } from '../utils/config'

const ProfileBlock = ({
  user,
}:{
  user: User
}) => {
  const defaultProfileImg = config.DEFAULT_PROFILE_IMG

  return (
    <div className="mb-10">
      <div className="bg-gray-400 w-full h-32"></div>
      <div className="relative p-2">
        <img src={user.profileImg ? user.profileImg : defaultProfileImg} alt="" className="rounded-full h-auto w-20 absolute -top-10"/>
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
              {user.num_following || user.following?.length}
            </span>
            <span className="text-twitter-gray mr-3">
              Following
            </span>
            <span className="mr-1">
              {user.num_followers || user.followers?.length}
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
