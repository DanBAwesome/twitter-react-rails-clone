json.tweet do
    json.id @tweet.id
    json.username @tweet.user.username
    json.message  @tweet.message
    json.image url_for(@tweet.image) if @tweet.image.attached?
  end