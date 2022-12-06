// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Transporter',
      icon: HomeOutline,
      path: '/transporter'
    }
  ]
}

export default navigation
