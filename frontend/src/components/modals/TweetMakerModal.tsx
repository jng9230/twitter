import { Tweet, User } from "../../utils/APITypes"
import TweetMaker from "../TweetMaker"
import { Modal } from "./Modal"
const TweetMakerModal = ({
    onClick,
    user,
    handleAddTweet
}:{
    onClick: () => void,
    user: User,
    handleAddTweet: (t: Tweet) => void
}) => {
  return (
    <Modal onClick={onClick}>
        <TweetMaker user={user} handleAddTweet={handleAddTweet}/>
    </Modal>
  )
}

export default TweetMakerModal
