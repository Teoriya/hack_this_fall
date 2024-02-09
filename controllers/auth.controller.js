module.exports = {
  logout: async (_, res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({});
  },
};
