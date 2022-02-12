/**
 * Configuration File
 * Replace values with your information
 */

const Config = {
  title: 'Longevity Tech Tree',
  subtitle: 'Prototype',
  key: [
    {
      title: 'Core Technology',
      color: '#9FC4FF',
    },
    {
      title: 'Longevity Tech',
      color: '#FFC6FE',
    },
    {
      title: 'General Improvement',
      color: '#FDFFB6',
    }
  ],
  axis_enabled: true,
  axis_x: ['Molecule Scale', 'Cell Scale', 'Tissue', 'Organ', 'Organism'],
  axis_y: ['Reprogramming', 'Replace Bio', 'Replace Synthetic', 'Slow Damage', 'Enhance', 'Recycle', 'Prevent', 'Repair', 'Removal'],
  github_repo_owner: 'Foresight-Institute',
  github_repo_name: 'biotech-health-extension-tree',
  github_base_branch: 'staging',
  github_token: process.env.REACT_APP_TOKEN,
  cover_image_url: 'https://fsnone-bb4c.kxcdn.com/wp-content/uploads/2021/10/Biotech-program-image.jpg',
  tree_background_color: '#1D243C'
}

export default Config;