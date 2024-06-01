import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import userService from "../../../../services/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DetailsDialog = ({ triggerRef, user }) => {
  const handleDetails = async (e) => {
    e.preventDefault();

    const whatsappNumber = e.target.whatsapp.value;
    const instagramHandle = e.target.instagram.value;

    if (!whatsappNumber || !instagramHandle) {
      toast("Incomplete form", {
        description: "Please fill the entire form",
        icon: <XCircleIcon className="text-red-600" />,
      });
      return;
    }

    const extras = {
      whatsappNumber: whatsappNumber,
      instagramHandle: instagramHandle,
    };

    await userService.enterExtras(user.id, extras);
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} asChild className="hidden">
        <Button>Enroll now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Final Step</DialogTitle>
          <DialogDescription>
            Enter your data to enroll in the course.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="items-center space-y-2 w-full">
            <form
              className="space-y-4"
              name="contact-details"
              netlify
              onSubmit={(e) => handleDetails(e)}
            >
              <div name="whatsInput">
                <Label className="text-left" htmlFor="whatsapp">
                  Whatsapp Number
                </Label>
                <Input
                  name="whatsapp"
                  autoComplete="off"
                  placeholder="+92..."
                  required
                />
              </div>
              <div name="instaInput">
                <Label className="text-left" htmlFor="instagram">
                  Instagram Handle
                </Label>
                <Input
                  name="instagram"
                  autoComplete="off"
                  placeholder="@..."
                  required
                />
              </div>
              <div className="w-full flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
