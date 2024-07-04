import GridLoader from 'react-spinners/GridLoader'

export default ({ size }) => {
  return (
    <GridLoader
      color="#f5d922"
      size={size}
      loading={true}
    />
  )
}
