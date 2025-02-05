class IssueComponent extends HTMLElement {
    static get observedAttributes() {
        return ["config", "data"];
    }

    config = [
        {
            formLabel: "form-label",
            formClass: "form-control"
        }
    ];

    data = [
        { label: "Report Name", type: "text", required: true, className: "col-3 col-md-2 rounded-pill ms-3", placeholder: "Enter Your Report Name" },
        { label: "Candidate Name", type: "text", required: true, className: "col-3 col-md-2 rounded-pill ms-3", placeholder: "Enter Your Candidate Name" },
        { label: "Category Name", type: "select", options: ["Male", "Female", "Other"], required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Select Your Category" },
        { label: "Medal", type: "text", required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Enter Medal Type" },
        { label: "Certificate No.", type: "number", required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Enter Certificate No" },
        { label: "button", type: "submit", value: "Submit", className: "col-3 col-md-3 rounded-pill ms-3", id: "submit_button" }
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.formValues = {}; // Store form input values
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "config" && newValue) {
            this.config = JSON.parse(newValue);
        }
        if (name === "data" && newValue) {
            this.data = JSON.parse(newValue);
        }
        this.renderComponent();
    }

    renderComponent() {
        this.shadowRoot.innerHTML = "";

        const bootstrapLink = document.createElement("link");
        bootstrapLink.setAttribute("rel", "stylesheet");
        bootstrapLink.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
        this.shadowRoot.appendChild(bootstrapLink);

        const form = document.createElement("form");
        form.className = "row g-3 mt-5 rounded";

        this.data.forEach((field) => {
            const formGroup = document.createElement("div");
            formGroup.className = `${field.className || "col-12"} mb-3`;

            const label = document.createElement("label");
            label.className = this.config[0]?.formLabel || "form-label";
            label.textContent = field.label;

            let input;
            if (field.type === "select") {
                input = document.createElement("select");
                input.className = `${this.config[0]?.formClass || "form-select"} rounded-pill`;
                input.required = field.required || false;

                field.options?.forEach((option) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.toLowerCase();
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
            } else if (field.type === "submit") {
                input = document.createElement("button");
                input.type = "submit";
                input.className = `${this.config[0]?.formClass || "btn btn-primary"} ${field.className}`;
                input.textContent = field.value;
                input.id = field.id || field.label.toLowerCase().replace(/\s+/g, "_");
            } else {
                input = document.createElement("input");
                input.type = field.type;
                input.placeholder = field.placeholder || "";
                input.className = `${this.config[0]?.formClass || "form-control"} rounded-pill`;
                input.required = field.required || false;
                input.id = field.label.toLowerCase().replace(/\s+/g, "_");
            }

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            form.appendChild(formGroup);

            input.addEventListener("input", () => this.updateFormData());
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Form submitted:", this.formValues);
        });

        this.shadowRoot.appendChild(form);
        this.updateFormData();
    }

    updateFormData() {
        const formData = {};
        this.shadowRoot.querySelectorAll("input, select").forEach((inputElement) => {
            formData[inputElement.previousElementSibling.textContent] = inputElement.value;
        });
        console.log("Form data:", formData);
    }
}

customElements.define("issue-component", IssueComponent);
