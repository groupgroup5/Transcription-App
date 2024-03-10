<script lang="ts">
    import {
            Accordion,
            AccordionContent,
            AccordionItem,
            AccordionTrigger,
    } from "$components/ui/accordion"

</script>

<div class="flex h-screen">
    <div class="m-auto w-80">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it?</AccordionTrigger>
              <AccordionContent>
                Yes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it really?</AccordionTrigger>
              <AccordionContent>
                Yes. It really is.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Are you sure?</AccordionTrigger>
              <AccordionContent>
                🤨
              </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</div>