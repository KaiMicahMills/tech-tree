/**
 * Configuration File
 * Replace values with your information
 */

const Config = {
  title: 'Tech Tree',
  subtitle: 'Prototype',
  key: [
    {
      title: 'Example Type 1',
      color: '#9FC4FF',
    },
    {
      title: 'Example Type 2',
      color: '#FFC6FE',
    },
    {
      title: 'Example Type 3',
      color: '#FDFFB6',
    }
  ],
  github_repo_owner: 'KaiMicahMills',
  github_repo_name: 'tech-tree',
  github_base_branch: 'staging',
  github_token: process.env.REACT_APP_TOKEN,
  cover_image_url: 'https://fsnone-bb4c.kxcdn.com/wp-content/uploads/2021/10/Biotech-program-image.jpg',
  tree_background_color: '#1D243C'
}

export default Config;