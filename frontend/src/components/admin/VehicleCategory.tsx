import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory";

const Profiledata = () => {
  return (
    <Tabs defaultValue="manage" className="w-full p-5">
      <center>
        <TabsList className="bg-zinc-200 dark:bg-zinc-800">
          <TabsTrigger value="manage" className="w-44 hover:cursor-pointer">
            Manage Category
          </TabsTrigger>
          <TabsTrigger value="add" className="w-44 hover:cursor-pointer">
            Add Category
          </TabsTrigger>
        </TabsList>
      </center>

      <TabsContent value="add">
        <AddCategory />
      </TabsContent>

      <TabsContent value="manage">
        <ManageCategory />
      </TabsContent>
    </Tabs>
  );
};

export default Profiledata;
