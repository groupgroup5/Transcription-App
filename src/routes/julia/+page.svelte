<script lang="ts">
    import { Button } from "$components/ui/button"
    import {
            Dialog,
            DialogContent,
            DialogDescription,
            DialogHeader,
            DialogTitle,
            DialogTrigger,
            DialogFooter
} from "$components/ui/dialog"
    import { Input } from "$components/ui/input"
    import { Label } from "$components/ui/label"
</script>

<div class="flex h-screen">
    <div class="m-auto">
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Julia's name</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit</DialogTitle>
                <DialogDescription>
                  Make changes to Julia's name. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Julia Dy" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="username" class="text-right">
                    Username
                  </Label>
                  <Input id="username" value="@juliady" class="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>         
    </div>
</div>