import ClipLoader from 'react-spinners/ClipLoader'

export default ({ size }) => {
  return (
    <ClipLoader
      color="#4c1d95"
      size={size}
      loading={true}
    />
  )
}
