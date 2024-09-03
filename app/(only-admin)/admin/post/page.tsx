"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * contentType 
 * title, description,  publicTag ,image
 * 
 * startDate , endDate , openTimes
    latitude , longitude ,location, isParkingAvailable

 */
const AdminPostPage = () => {
  const [formData, setFormData] = useState();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/content/post", {
        method: "POST",
        body: JSON.stringify(event.target),
      });
      if (!res.ok) throw new Error("something is wrong");
      const data = await res.json();
      router.push(`/category/${data.category}/${data.id}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className="h-full">
      <form className="flex flex-col space-y-4" action="#">
        <select className="border py-2">
          <option value="popup">팝업스토어</option>
          <option value="exhibition">개인전시회</option>
        </select>
        <Input type="text" placeholder="title" />
        <Input type="text" placeholder="description" />
        <select className="border py-2">
          <option value="aa">aa</option>
          <option value="bb">bb</option>
          <option value="cc">cc</option>
        </select>
        <Calendar />
        {/* image 등록 -> 첫 사진 썸넬 */}
        <Input type="text" placeholder="open~close Time" />
        <label htmlFor="isParkingAvailable">
          <div>주차 가능</div>
          <Input type="checkbox" name="isParkingAvailable" />
        </label>
        <div>주소 검색 모달</div>
        <Button variant="outline">등록하기</Button>
      </form>
    </section>
  );
};

export default AdminPostPage;
