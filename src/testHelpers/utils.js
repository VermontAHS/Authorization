module.exports.createSession = (agent, userinfo) => {
  return agent
    .post('/api/login')
    .send({
      username: userinfo.username,
      password: userinfo.password,
    })
    .expect(200)
    .then(res => {
      const cookie = res.headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0]);

      agent.jar.setCookies(cookie);
    });
};
