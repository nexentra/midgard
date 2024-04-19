import Image from "next/image"

async function getData() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random")

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <div>
      <Image src={data.message} alt="dog" width={200} height={200} />
    </div>
  )
}
